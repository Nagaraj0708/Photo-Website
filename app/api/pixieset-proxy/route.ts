/**
 * Pixieset proxy
 *
 * Does everything server-side in one call:
 *  1. GET the guest-login page  → extract CSRF token + session cookie
 *  2. POST the password         → get authenticated session cookie
 *  3. GET the actual gallery    → return full HTML
 *
 * The client receives ready-to-render HTML and shows it in a srcdoc iframe.
 * No redirect, no new tab — stays on this site.
 *
 * GET /api/pixieset-proxy?gallery=<encoded-gallery-path-id>
 *   e.g. /api/pixieset-proxy?gallery=weddingblog
 */

import { NextRequest, NextResponse } from "next/server";

const PASSWORD    = "Aslamphotographer";
const PIXIESET    = "https://shiyarahweddings.pixieset.com";

const UA = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
};

/** Pull Set-Cookie header values into a single Cookie: string */
function cookieStr(headers: Headers, existing = ""): string {
  const newCookies = headers.getSetCookie?.() ?? [];
  const parts = existing ? existing.split("; ") : [];
  for (const c of newCookies) {
    const kv = c.split(";")[0];
    const key = kv.split("=")[0];
    // Replace existing key if present, otherwise append
    const idx = parts.findIndex((p) => p.startsWith(key + "="));
    if (idx >= 0) parts[idx] = kv;
    else parts.push(kv);
  }
  return parts.join("; ");
}

export async function GET(req: NextRequest) {
  const galleryId = req.nextUrl.searchParams.get("gallery"); // e.g. "weddingblog"
  if (!galleryId) {
    return NextResponse.json({ error: "Missing gallery param" }, { status: 400 });
  }

  const loginPageUrl = `${PIXIESET}/guestlogin/${galleryId}/`;
  const galleryUrl   = `${PIXIESET}/${galleryId}/`;

  try {
    // ── 1. Fetch the login page to get CSRF token + initial cookies ──────
    const loginPageRes = await fetch(loginPageUrl, {
      headers: UA,
      redirect: "follow",
    });

    if (!loginPageRes.ok) {
      return NextResponse.json(
        { error: `Login page fetch failed: ${loginPageRes.status}` },
        { status: loginPageRes.status }
      );
    }

    const loginHtml = await loginPageRes.text();
    let cookies = cookieStr(loginPageRes.headers);

    // Extract CSRF token (_token hidden input)
    const tokenMatch =
      loginHtml.match(/name="_token"\s+value="([^"]+)"/) ||
      loginHtml.match(/value="([^"]+)"\s+name="_token"/);
    const csrfToken = tokenMatch?.[1] ?? "";

    if (!csrfToken) {
      return NextResponse.json({ error: "CSRF token not found" }, { status: 500 });
    }

    // ── 2. POST the password ──────────────────────────────────────────────
    const body = new URLSearchParams();
    body.append("_token", csrfToken);
    body.append("password", PASSWORD);

    const loginPostRes = await fetch(loginPageUrl, {
      method: "POST",
      headers: {
        ...UA,
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookies,
        Referer: loginPageUrl,
        Origin: PIXIESET,
      },
      body: body.toString(),
      redirect: "follow",
    });

    cookies = cookieStr(loginPostRes.headers, cookies);

    // ── 3. Fetch the actual gallery with authenticated session ────────────
    const galleryRes = await fetch(galleryUrl, {
      headers: {
        ...UA,
        Cookie: cookies,
        Referer: loginPageUrl,
      },
      redirect: "follow",
    });

    if (!galleryRes.ok) {
      return NextResponse.json(
        { error: `Gallery fetch failed: ${galleryRes.status}` },
        { status: galleryRes.status }
      );
    }

    let html = await galleryRes.text();

    // ── 4. Rebase relative URLs so assets load from Pixieset's origin ────
    // Insert <base> tag + fix root-relative paths
    html = html.replace(
      /(<head[^>]*>)/i,
      `$1<base href="${PIXIESET}/">`
    );

    // Return the authenticated HTML to the client
    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        // Never cache — session-specific content
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[pixieset-proxy]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
