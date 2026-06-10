"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Upload, X, CheckCircle, LogOut, Grid3x3, Plus, Trash2,
  Camera, Lock, Eye, EyeOff, ImageIcon, Loader2, AlertCircle,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
type Category =
  | "weddings" | "reception" | "pre-wedding"
  | "maternity" | "baby" | "events";

interface UploadedPhoto {
  id: string;
  url: string;
  title: string;
  category: Category;
  uploadedAt: string;
  size: string;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "weddings",    label: "Weddings"        },
  { value: "reception",   label: "Reception"       },
  { value: "pre-wedding", label: "Pre-Wedding"     },
  { value: "maternity",   label: "Maternity"       },
  { value: "baby",        label: "Baby Shoots"     },
  { value: "events",      label: "Events"          },
];

/* ─── Demo seed photos ────────────────────────────────────────── */
const SEED: UploadedPhoto[] = [
  { id: "s1", url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=75", title: "Sacred Saptapadi", category: "weddings",    uploadedAt: "2025-05-12", size: "2.4 MB" },
  { id: "s2", url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=75", title: "Candlelit Reception", category: "reception",  uploadedAt: "2025-05-10", size: "1.8 MB" },
  { id: "s3", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=75", title: "Marina Romance",     category: "pre-wedding", uploadedAt: "2025-04-28", size: "3.1 MB" },
  { id: "s4", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=75", title: "Golden Glow",         category: "maternity",   uploadedAt: "2025-04-15", size: "2.0 MB" },
  { id: "s5", url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=75",   title: "Newborn Serenity",  category: "baby",        uploadedAt: "2025-04-02", size: "1.5 MB" },
  { id: "s6", url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=75", title: "Grand Mandap",       category: "events",      uploadedAt: "2025-03-22", size: "2.9 MB" },
];

/* ─── Login Screen ────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 700));
    /* In production: verify against a server action / env secret */
    if (password === "shiyarah2025") {
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0A09] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full border border-[#C8956C]/40 bg-[#C8956C]/8 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-[#C8956C]" />
          </div>
          <h1
            className="text-3xl font-light text-[#FAF5F0]"
            style={{ fontFamily: "var(--font-cormorant,serif)" }}
          >
            Shiyarah Admin
          </h1>
          <p className="text-[#7A6358] text-sm mt-1">Photo Management Panel</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-[#1C1614] border border-[#3D2F2A] rounded-3xl p-8 space-y-5"
        >
          <div>
            <label className="block text-[#C4A99A] text-xs mb-2 tracking-wide uppercase">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your admin password"
                className="admin-input pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6358] hover:text-[#C8956C] transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#C8956C] hover:bg-[#E8B49A] text-[#0D0A09] font-semibold rounded-full transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</> : "Enter Admin Panel"}
          </button>

          <p className="text-center text-[#3D2F2A] text-xs">
            Demo password: <span className="text-[#7A6358]">shiyarah2025</span>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ─── Upload Drop Zone ────────────────────────────────────────── */
function DropZone({
  onFiles,
}: {
  onFiles: (files: File[]) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (files.length) onFiles(files);
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`admin-drop-zone cursor-pointer p-10 text-center transition-all ${dragging ? "drag-over" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
      <Upload className="w-10 h-10 text-[#C8956C]/50 mx-auto mb-3" />
      <p className="text-[#C4A99A] text-sm font-medium mb-1">
        Drag &amp; drop photos here
      </p>
      <p className="text-[#7A6358] text-xs">
        or <span className="text-[#C8956C]">click to browse</span> · JPG, PNG, WEBP
      </p>
    </div>
  );
}

/* ─── Upload Queue Item ───────────────────────────────────────── */
interface QueueItem {
  id: string;
  file: File;
  preview: string;
  title: string;
  category: Category;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
}

/* ─── Main Dashboard ──────────────────────────────────────────── */
export default function AdminDashboard() {
  const [authed,     setAuthed]     = useState(false);
  const [photos,     setPhotos]     = useState<UploadedPhoto[]>(SEED);
  const [queue,      setQueue]      = useState<QueueItem[]>([]);
  const [activeTab,  setActiveTab]  = useState<"gallery" | "upload">("gallery");
  const [filterCat,  setFilterCat]  = useState<Category | "all">("all");
  const [deleteId,   setDeleteId]   = useState<string | null>(null);
  const [toast,      setToast]      = useState<string | null>(null);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  /* ── Show toast ── */
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Handle dropped files ── */
  const handleFiles = (files: File[]) => {
    const items: QueueItem[] = files.map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      preview: URL.createObjectURL(f),
      title: f.name.replace(/\.[^.]+$/, "").replace(/-|_/g, " "),
      category: "weddings",
      status: "pending",
      progress: 0,
    }));
    setQueue((q) => [...q, ...items]);
    setActiveTab("upload");
  };

  /* ── Simulate upload ── */
  const uploadItem = async (id: string) => {
    setQueue((q) => q.map((i) => i.id === id ? { ...i, status: "uploading" } : i));

    for (let p = 10; p <= 100; p += 10) {
      await new Promise((r) => setTimeout(r, 80));
      setQueue((q) => q.map((i) => i.id === id ? { ...i, progress: p } : i));
    }

    setQueue((q) => {
      const item = q.find((i) => i.id === id);
      if (!item) return q;
      const newPhoto: UploadedPhoto = {
        id: "u_" + id,
        url: item.preview,
        title: item.title,
        category: item.category,
        uploadedAt: new Date().toISOString().split("T")[0],
        size: `${(item.file.size / 1024 / 1024).toFixed(1)} MB`,
      };
      setPhotos((ph) => [newPhoto, ...ph]);
      showToast(`"${item.title}" uploaded successfully!`);
      return q.map((i) => i.id === id ? { ...i, status: "done" } : i);
    });
  };

  const uploadAll = () => {
    queue.filter((i) => i.status === "pending").forEach((i) => uploadItem(i.id));
  };

  const removeFromQueue = (id: string) => {
    setQueue((q) => q.filter((i) => i.id !== id));
  };

  const deletePhoto = (id: string) => {
    setPhotos((p) => p.filter((ph) => ph.id !== id));
    setDeleteId(null);
    showToast("Photo removed from gallery.");
  };

  const filteredPhotos =
    filterCat === "all" ? photos : photos.filter((p) => p.category === filterCat);

  /* ── Stats ── */
  const stats = {
    total: photos.length,
    byCategory: CATEGORIES.map((c) => ({
      ...c,
      count: photos.filter((p) => p.category === c.value).length,
    })),
  };

  return (
    <div className="min-h-screen bg-[#0D0A09]">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-[#1C1614] border border-[#C8956C]/40 rounded-2xl shadow-2xl text-[#FAF5F0] text-sm animate-float">
          <CheckCircle className="w-4 h-4 text-[#C8956C]" />
          {toast}
        </div>
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 glass-dark border-b border-[#3D2F2A]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-[#C8956C]" />
            <span className="text-[#FAF5F0] font-medium text-sm">
              Shiyarah Admin
            </span>
            <span className="w-1 h-1 rounded-full bg-[#3D2F2A] inline-block" />
            <span className="text-[#7A6358] text-xs">Photo Manager</span>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 text-[#7A6358] hover:text-[#C4A99A] text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <div className="col-span-2 sm:col-span-1 bg-[#1C1614] border border-[#3D2F2A] rounded-2xl p-4">
            <div className="text-[#7A6358] text-xs mb-1">Total Photos</div>
            <div className="text-2xl font-light text-[#FAF5F0]"
              style={{ fontFamily: "var(--font-cormorant,serif)" }}>
              {stats.total}
            </div>
          </div>
          {stats.byCategory.map((c) => (
            <div key={c.value} className="bg-[#1C1614] border border-[#3D2F2A] rounded-2xl p-4">
              <div className="text-[#7A6358] text-[0.65rem] mb-1 truncate">{c.label}</div>
              <div className="text-lg font-light text-[#C8956C]"
                style={{ fontFamily: "var(--font-cormorant,serif)" }}>
                {c.count}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-3 mb-6">
          {(["gallery", "upload"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-[#C8956C] text-[#0D0A09]"
                  : "border border-[#3D2F2A] text-[#7A6358] hover:text-[#C4A99A] hover:border-[#C8956C]/40"
              }`}
            >
              {tab === "gallery" ? (
                <span className="flex items-center gap-1.5"><Grid3x3 className="w-3.5 h-3.5" /> Gallery ({photos.length})</span>
              ) : (
                <span className="flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Upload {queue.length > 0 ? `(${queue.length})` : ""}</span>
              )}
            </button>
          ))}
        </div>

        {/* ────────── GALLERY TAB ────────── */}
        {activeTab === "gallery" && (
          <div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setFilterCat("all")}
                className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                  filterCat === "all"
                    ? "bg-[#C8956C] text-[#0D0A09] font-semibold"
                    : "border border-[#3D2F2A] text-[#7A6358] hover:border-[#C8956C]/40 hover:text-[#C4A99A]"
                }`}
              >
                All ({photos.length})
              </button>
              {CATEGORIES.map((c) => {
                const count = photos.filter((p) => p.category === c.value).length;
                return (
                  <button
                    key={c.value}
                    onClick={() => setFilterCat(c.value)}
                    className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                      filterCat === c.value
                        ? "bg-[#C8956C] text-[#0D0A09] font-semibold"
                        : "border border-[#3D2F2A] text-[#7A6358] hover:border-[#C8956C]/40 hover:text-[#C4A99A]"
                    }`}
                  >
                    {c.label} ({count})
                  </button>
                );
              })}
            </div>

            {filteredPhotos.length === 0 ? (
              <div className="text-center py-24">
                <ImageIcon className="w-12 h-12 text-[#3D2F2A] mx-auto mb-4" />
                <p className="text-[#7A6358]">No photos in this category yet.</p>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="mt-4 px-5 py-2 text-sm bg-[#C8956C] text-[#0D0A09] rounded-full"
                >
                  Upload Photos
                </button>
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative group break-inside-avoid overflow-hidden rounded-2xl bg-[#1C1614] border border-[#3D2F2A] hover:border-[#C8956C]/30 transition-all"
                  >
                    <div className="relative aspect-square img-zoom">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex flex-col items-start justify-end p-3 opacity-0 group-hover:opacity-100">
                      <p className="text-[#FAF5F0] text-xs font-medium mb-0.5 truncate w-full">
                        {photo.title}
                      </p>
                      <p className="text-[#C8956C] text-[0.65rem] capitalize">{photo.category}</p>
                      <p className="text-[#7A6358] text-[0.6rem]">{photo.uploadedAt} · {photo.size}</p>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => setDeleteId(photo.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 border border-red-500/40 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Category badge */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2 py-0.5 bg-black/60 text-[#C8956C] text-[0.6rem] rounded-full capitalize">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ────────── UPLOAD TAB ────────── */}
        {activeTab === "upload" && (
          <div className="max-w-3xl mx-auto">
            <DropZone onFiles={handleFiles} />

            {queue.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#FAF5F0] font-medium">
                    Upload Queue ({queue.length})
                  </h3>
                  <button
                    onClick={uploadAll}
                    disabled={queue.every((i) => i.status !== "pending")}
                    className="px-5 py-2 text-sm bg-[#C8956C] hover:bg-[#E8B49A] text-[#0D0A09] font-semibold rounded-full transition-all disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload All
                  </button>
                </div>

                <div className="space-y-3">
                  {queue.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 bg-[#1C1614] border border-[#3D2F2A] rounded-2xl p-4"
                    >
                      {/* Preview */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#2E2421]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.preview} alt="" className="w-full h-full object-cover" />
                        {item.status === "done" && (
                          <div className="absolute inset-0 bg-green-900/60 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-[#7A6358] text-[0.65rem] mb-1 uppercase tracking-wide">
                              Photo Title
                            </label>
                            <input
                              value={item.title}
                              onChange={(e) =>
                                setQueue((q) => q.map((i) => i.id === item.id ? { ...i, title: e.target.value } : i))
                              }
                              className="admin-input py-1.5 text-sm"
                              disabled={item.status !== "pending"}
                            />
                          </div>
                          <div>
                            <label className="block text-[#7A6358] text-[0.65rem] mb-1 uppercase tracking-wide">
                              Category
                            </label>
                            <select
                              value={item.category}
                              onChange={(e) =>
                                setQueue((q) =>
                                  q.map((i) => i.id === item.id
                                    ? { ...i, category: e.target.value as Category }
                                    : i
                                  )
                                )
                              }
                              className="admin-input py-1.5 text-sm appearance-none"
                              disabled={item.status !== "pending"}
                            >
                              {CATEGORIES.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Progress bar */}
                        {item.status === "uploading" && (
                          <div className="w-full bg-[#2E2421] rounded-full h-1.5 mt-2">
                            <div
                              className="bg-[#C8956C] h-1.5 rounded-full transition-all duration-200"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        )}

                        {item.status === "done" && (
                          <p className="text-green-400 text-xs flex items-center gap-1 mt-1">
                            <CheckCircle className="w-3 h-3" /> Uploaded to gallery
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 shrink-0">
                        {item.status === "pending" && (
                          <button
                            onClick={() => uploadItem(item.id)}
                            className="px-3 py-1.5 text-xs bg-[#C8956C] hover:bg-[#E8B49A] text-[#0D0A09] rounded-full font-semibold transition-all"
                          >
                            Upload
                          </button>
                        )}
                        {item.status === "uploading" && (
                          <Loader2 className="w-5 h-5 text-[#C8956C] animate-spin mx-auto" />
                        )}
                        {item.status !== "uploading" && (
                          <button
                            onClick={() => removeFromQueue(item.id)}
                            className="w-7 h-7 rounded-full border border-[#3D2F2A] flex items-center justify-center text-[#7A6358] hover:text-red-400 hover:border-red-500/40 transition-all"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Delete Confirm Modal ─── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#1C1614] border border-[#3D2F2A] rounded-3xl p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-[#FAF5F0] font-medium mb-2">Remove Photo?</h3>
            <p className="text-[#7A6358] text-sm mb-7">
              This photo will be removed from the gallery. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 border border-[#3D2F2A] text-[#C4A99A] rounded-full text-sm hover:border-[#C8956C]/40 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePhoto(deleteId)}
                className="flex-1 py-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full text-sm font-semibold transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
