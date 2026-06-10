"use client";

export default function MarqueeSection() {
  const items = [
    "Wedding Photography",
    "Cinematic Films",
    "Reception",
    "Pre-Wedding",
    "Maternity",
    "Newborn",
    "Events",
    "Chennai · Tamil Nadu",
  ];

  return (
    <div className="py-5 bg-[#111] overflow-hidden border-y border-[#222]">
      <div className="flex whitespace-nowrap">
        <div className="marquee-inner flex gap-12 pr-12">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-12 text-white/50 text-label"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-white/20" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
