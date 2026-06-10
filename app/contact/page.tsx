import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import ContactForm from "./ContactForm";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { studioInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Shiyarah Weddings. Call +91 72007 35915 or WhatsApp Aslam to book your session in Chennai.",
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <section className="pt-12 pb-10 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="tag text-[#C8A96E] mb-5">Get In Touch</div>
          <h1 className="font-editorial text-[#0E0E0E] leading-none"
            style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3rem,7vw,6.5rem)", letterSpacing:"-0.04em", lineHeight:0.92, fontWeight:400 }}>
            Let&apos;s Create<br /><em className="italic text-[#9CA3AF]">Together</em>
          </h1>
        </div>
      </section>

      <section className="pb-24 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-editorial text-[#0E0E0E] mb-8"
                  style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", letterSpacing:"-0.02em", fontWeight:400 }}>
                  Studio Information
                </h2>
                <ul className="space-y-7">
                  {[
                    { icon:<Phone  className="w-4 h-4" />, label:"Phone",   value:studioInfo.phone,            href:`tel:${studioInfo.phoneRaw}` },
                    { icon:<Mail   className="w-4 h-4" />, label:"Email",   value:studioInfo.email,            href:`mailto:${studioInfo.email}` },
                    { icon:<MapPin className="w-4 h-4" />, label:"Address", value:studioInfo.address,          href:studioInfo.mapsUrl },
                    { icon:<Clock  className="w-4 h-4" />, label:"Hours",   value:"Mon – Sat: 10 am – 7 pm",  href:undefined },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-5">
                      <div className="w-10 h-10 border border-[#EFEDE8] flex items-center justify-center text-[#C8A96E] shrink-0">{item.icon}</div>
                      <div>
                        <p className="text-[#0E0E0E] text-sm font-semibold mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target={item.label==="Address"?"_blank":undefined} rel={item.label==="Address"?"noopener noreferrer":undefined}
                            className="text-[#6B6B6B] text-sm hover:text-[#C8A96E] transition-colors leading-relaxed">{item.value}</a>
                        ) : (
                          <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <a href={studioInfo.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-[#F0FDF4] border border-[#BBF7D0] hover:border-green-400 transition-colors">
                <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.335-1.503A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818A9.82 9.82 0 016.993 20.453l-.359-.214-3.732.884.948-3.643-.235-.374A9.775 9.775 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#0E0E0E] text-sm font-semibold">Chat on WhatsApp</p>
                  <p className="text-green-600 text-xs mt-0.5">Aslam usually replies within 1 hour</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              </a>

              <div>
                <p className="text-[#0E0E0E] text-sm font-semibold mb-4">Follow Our Work</p>
                <div className="flex items-center gap-3">
                  {[{ label:"Instagram", href:studioInfo.instagram }, { label:"Facebook", href:studioInfo.facebook }].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 border border-[#EFEDE8] text-[#6B6B6B] text-xs tracking-widest uppercase hover:border-[#0E0E0E] hover:text-[#0E0E0E] transition-all">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-[#EFEDE8] p-10">
                <h2 className="font-editorial text-[#0E0E0E] mb-8"
                  style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.75rem", letterSpacing:"-0.025em", fontWeight:400 }}>
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-72 bg-[#EFEDE8] border-t border-[#E5E4E0] flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-7 h-7 text-[#C8A96E] mx-auto mb-3" />
          <p className="text-[#0E0E0E] font-semibold text-sm">Shiyarah Weddings Studio</p>
          <p className="text-[#6B6B6B] text-xs mt-1">{studioInfo.address}</p>
          <a href={studioInfo.mapsUrl} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#C8A96E] hover:underline font-medium tracking-wide">
            Open in Google Maps <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
