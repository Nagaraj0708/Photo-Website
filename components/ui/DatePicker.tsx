"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, startOfToday } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select your event date",
  error,
  label,
  required,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(value ?? startOfToday());
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const today = startOfToday();

  const handleSelect = (date: Date | undefined) => {
    onChange(date);
    if (date) setTimeout(() => setOpen(false), 150);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* ── Label ── */}
      {label && (
        <label
          className="block mb-2"
          style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, color: "#6B6B6B", fontFamily: "'Inter',sans-serif" }}
        >
          {label}{required && " *"}
        </label>
      )}

      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between"
        style={{
          padding: "0.875rem 1rem",
          background: "white",
          border: `1px solid ${error ? "#EF4444" : open ? "#C8A96E" : "#E5E4E0"}`,
          cursor: "pointer",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: open ? "0 0 0 3px rgba(200,169,110,0.12)" : "none",
        }}
      >
        <span style={{
          fontSize: "0.875rem",
          fontFamily: "'Inter',sans-serif",
          fontWeight: value ? 400 : 300,
          color: value ? "#0E0E0E" : "#9CA3AF",
          textAlign: "left",
        }}>
          {value ? format(value, "EEEE, d MMMM yyyy") : placeholder}
        </span>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          {value && (
            <button
              type="button"
              onClick={clear}
              className="w-5 h-5 flex items-center justify-center transition-colors"
              style={{ color: "#9CA3AF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0E0E0E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
              aria-label="Clear date"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <CalendarDays
            className="w-4 h-4 transition-colors"
            style={{ color: open ? "#C8A96E" : "#9CA3AF" }}
          />
        </div>
      </button>

      {error && <p className="mt-1.5 text-red-500 text-xs">{error}</p>}

      {/* ── Calendar panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="sw-datepicker-panel"
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              zIndex: 9999,
              background: "white",
              border: "1px solid #E5E4E0",
              boxShadow: "0 20px 60px rgba(14,14,14,0.14)",
              minWidth: 300,
            }}
          >
            <DayPicker
              mode="single"
              selected={value}
              onSelect={handleSelect}
              month={month}
              onMonthChange={setMonth}
              disabled={{ before: today }}
              showOutsideDays
              components={{
                IconLeft:  () => <ChevronLeft  className="w-4 h-4" />,
                IconRight: () => <ChevronRight className="w-4 h-4" />,
              }}
            />

            {/* Footer bar */}
            <div style={{ padding: "0.625rem 1rem", borderTop: "1px solid #EFEDE8", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                {value ? format(value, "d MMM yyyy") : "No date selected"}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#0E0E0E", background:"none", border:"none", cursor:"pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0E0E0E")}
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
