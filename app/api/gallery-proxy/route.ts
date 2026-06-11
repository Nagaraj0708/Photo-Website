/**
 * Full reverse proxy for Pixieset galleries.
 *
 * Every request the iframe makes comes here first:
 *   /api/gallery-proxy?path=/weddingblog/            → proxies GET
 *   /api/gallery-proxy?path=/guestlogin/weddingblog/ → proxies POST (password submit)
 *
 * Session cookies are stored in a signed httpOnly cookie on our domain
 * so the iframe can maintain the authenticated session across requests.
 */

import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://shiyarahweddings.pixieset.com";
const PASSWORD  = "Aslamphotographer";

const BROWSER_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

/** Merge Set-Cookie values into a flat cookie string */
function mergeCookies(existing: string, newHeaders: Headers): string {
  const incoming = newHeaders.getSetCookie?.() ?? [];
  const map = new Map<string, string>();
  for (const c of existing.split(";").map((s) => s.trim()).filter(Boolean)) {
    const [k] = c.split("=");
    map.set(k.trim(), c);
  }
  for (const c of incoming) {
    const kv = c.split(";")[0].trim();
    const [k] = kv.split("=");
    map.set(k.trim(), kv);
  }
  return [...map.values()].join("; ");
}

/** Rewrite HTML so all links/assets go through this proxy */
function rewriteHtml(html: string, proxyBase: string): string {
  // Insert <base> pointing to our proxy so relative URLs resolve correctly
  // We DON'T use <base href="https://pixieset..."> because we want all
  // requests to come through our proxy, not directly to Pixieset.

  // Rewrite absolute Pixieset URLs in href/src/action/data attributes
  const rewritten = html
    // <base> tag injection after <head>
    .replace(/(<head[^>]*>)/i, `$1\n<base href="${proxyBase}">`)
    // href="https://shiyarahweddings.pixieset.com/..."
    .replace(
      new RegExp(`(href|src|action|data-src)="https://shiyarahweddings\\.pixieset\\.com(/[^"]*)"`, "gi"),
      (_, attr, path) => `${attr}="${proxyBase}?path=${encodeURIComponent(path)}"`
    )
    // href="/..." (root-relative)
    .replace(
      /(href|src|action|data-src)="(\/[^"]*?)"/gi,
      (_, attr, path) => `${attr}="${proxyBase}?path=${encodeURIComponent(path)}"`
    );

  return rewritten;
}

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") ?? "/";
  const upstreamUrl = `${UPSTREAM}${path}`;
  const proxyBase = `${req.nextUrl.origin}/api/gallery-proxy`;

  // Get session cookies we stored earlier
  const sessionCookies = req.cookies.get("pxs_session")?.value ?? "";

  try {
    const upRes = await fetch(upstreamUrl, {
      headers: {
        ...BROWSER_HEADERS,
        Cookie: sessionCookies,
        Referer: UPSTREAM + "/",
      },
      redirect: "follow",
    });

    const contentType = upRes.headers.get("content-type") ?? "";

    // For HTML responses, rewrite URLs to go through the proxy
    if (contentType.includes("text/html")) {
      let html = await upRes.text();

      // If the page still shows the password form, auto-submit it
      const isLocked =
        html.includes("guestlogin") || html.includes("Enter password");

      if (isLocked) {
        // Extract CSRF token
        const tokenMatch =
          html.match(/name="_token"\s+value="([^"]+)"/) ||
          html.match(/value="([^"]+)"\s+name="_token"/);
        const csrfToken = tokenMatch?.[1] ?? "";

        // Determine login endpoint
        const collectionSlug = path.replace(/\//g, "");
        const loginPath = `/guestlogin/${collectionSlug}/`;
        const loginUrl  = `${UPSTREAM}${loginPath}`;

        const newCookies = mergeCookies(sessionCookies, upRes.headers);

        // POST the password
        const loginBody = new URLSearchParams();
        loginBody.set("_token", csrfToken);
        loginBody.set("password", PASSWORD);

        const loginRes = await fetch(loginUrl, {
          method: "POST",
          headers: {
            ...BROWSER_HEADERS,
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: newCookies,
            Referer: upstreamUrl,
            Origin: UPSTREAM,
          },
          body: loginBody.toString(),
          redirect: "follow",
        });

        const authCookies = mergeCookies(newCookies, loginRes.headers);

        // Now fetch the gallery with authenticated session
        const galleryRes = await fetch(`${UPSTREAM}${path}`, {
          headers: {
            ...BROWSER_HEADERS,
            Cookie: authCookies,
            Referer: loginUrl,
          },
          redirect: "follow",
        });

        html = await galleryRes.text();
        const finalCookies = mergeCookies(authCookies, galleryRes.headers);
        const rewritten     = rewriteHtml(html, proxyBase);

        const response = new NextResponse(rewritten, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
        });
        // Store session for subsequent requests
        response.cookies.set("pxs_session", finalCookies, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 6, // 6 hours
          path: "/api/gallery-proxy",
        });
        return response;
      }

      const rewritten = rewriteHtml(html, proxyBase);
      const newCookies = mergeCookies(sessionCookies, upRes.headers);
      const response = new NextResponse(rewritten, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
      });
      response.cookies.set("pxs_session", newCookies, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 6,
        path: "/api/gallery-proxy",
      });
      return response;
    }

    // For non-HTML (images, JS, CSS) — stream directly
    const body = await upRes.arrayBuffer();
    return new NextResponse(body, {
      status: upRes.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[gallery-proxy GET]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") ?? "/";
  const upstreamUrl = `${UPSTREAM}${path}`;
  const proxyBase   = `${req.nextUrl.origin}/api/gallery-proxy`;

  const sessionCookies = req.cookies.get("pxs_session")?.value ?? "";
  const body           = await req.text();

  try {
    // Replace any proxied form field values back to original paths
    const upRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        ...BROWSER_HEADERS,
        "Content-Type": req.headers.get("content-type") ?? "application/x-www-form-urlencoded",
        Cookie: sessionCookies,
        Referer: UPSTREAM + path,
        Origin: UPSTREAM,
      },
      body,
      redirect: "follow",
    });

    const contentType  = upRes.headers.get("content-type") ?? "";
    const newCookies   = mergeCookies(sessionCookies, upRes.headers);

    if (contentType.includes("text/html")) {
      const html      = await upRes.text();
      const rewritten = rewriteHtml(html, proxyBase);

      const response = new NextResponse(rewritten, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
      });
      response.cookies.set("pxs_session", newCookies, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 6,
        path: "/api/gallery-proxy",
      });
      return response;
    }

    const buf = await upRes.arrayBuffer();
    return new NextResponse(buf, {
      status: upRes.status,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    console.error("[gallery-proxy POST]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
