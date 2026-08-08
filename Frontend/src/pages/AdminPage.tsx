import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GalleryImage, InstagramPost } from '@/types';
import {
  Upload, Star, Trash2, ArrowLeft, Image as ImageIcon,
  Instagram, CloudUpload, CheckCircle2, AlertCircle,
  Folder, Eye, EyeOff, RefreshCw, BarChart3, Settings2
} from 'lucide-react';

/* ─── Stat Card ─── */
function StatCard({
  label, value, icon: Icon, accent,
}: {
  label: string; value: number; icon: React.ElementType; accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
        <p className="text-xs text-slate-500 font-semibold mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'instagram'>('gallery');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [igPosts, setIgPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Summit');
  const [isFeaturedInput, setIsFeaturedInput] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [galRes, igRes] = await Promise.all([fetch('/api/gallery'), fetch('/api/instagram')]);
      const galData = await galRes.json();
      const igData = await igRes.json();
      if (galData.success) setImages(galData.images);
      if (igData.success) setIgPosts(igData.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadMsg(null);
    try {
      const formData = new FormData();
      if (uploadMode === 'file' && file) formData.append('file', file);
      else if (uploadMode === 'url' && urlInput) formData.append('url', urlInput);
      else {
        setUploadMsg({ type: 'error', text: 'Please select a file or enter a URL.' });
        setUploading(false);
        return;
      }
      formData.append('title', titleInput || 'Untitled Image');
      formData.append('category', categoryInput);
      formData.append('isFeatured', isFeaturedInput ? 'true' : 'false');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadMsg({ type: 'success', text: 'Image uploaded successfully!' });
        setFile(null); setUrlInput(''); setTitleInput('');
        fetchData();
      } else {
        setUploadMsg({ type: 'error', text: data.message || 'Upload failed.' });
      }
    } catch {
      setUploadMsg({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setUploading(false);
    }
  };

  const toggleFeaturedImage = async (id: string, cur: boolean) => {
    const res = await fetch('/api/gallery', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isFeatured: !cur }),
    });
    const data = await res.json();
    if (data.success) setImages(prev => prev.map(img => img.id === id ? { ...img, isFeatured: !cur } : img));
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) setImages(prev => prev.filter(img => img.id !== id));
  };

  const toggleFeaturedIg = async (id: string, cur: boolean) => {
    const res = await fetch('/api/instagram', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isFeatured: !cur }),
    });
    const data = await res.json();
    if (data.success) setIgPosts(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !cur } : p));
  };

  const featuredCount   = images.filter(i => i.isFeatured).length;
  const featuredIgCount = igPosts.filter(p => p.isFeatured).length;

  return (
    <div className="min-h-screen bg-slate-100 font-sans">

      {/* ── Top Navigation Bar ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left: Brand */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-700 transition-colors border-r border-slate-200 pr-4 mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Site</span>
              </Link>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-black text-sm shadow-sm">
                  E
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 leading-tight">NEC E-Cell</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-tight">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              {activeTab === 'gallery' && (
                <button
                  onClick={() => setShowUploadPanel(v => !v)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black border transition-all ${
                    showUploadPanel
                      ? 'bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-blue-700 text-white border-blue-600 shadow-sm shadow-blue-700/20 hover:bg-blue-800'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  {showUploadPanel ? 'Close Upload' : 'Upload Photo'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Content Management
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Manage gallery photos and Instagram feed for the public website.
            </p>
          </div>
          <p className="text-xs text-slate-400 font-mono bg-white border border-slate-200 rounded-lg px-3 py-2 w-fit">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Photos"      value={images.length}   icon={ImageIcon}  accent="bg-blue-100 text-blue-700" />
          <StatCard label="Featured Photos"   value={featuredCount}   icon={Star}       accent="bg-amber-100 text-amber-600" />
          <StatCard label="Instagram Posts"   value={igPosts.length}  icon={Instagram}  accent="bg-pink-100 text-pink-600" />
          <StatCard label="Featured Posts"    value={featuredIgCount} icon={BarChart3}  accent="bg-emerald-100 text-emerald-600" />
        </div>

        {/* Tab Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center border-b border-slate-200 px-6">
            {[
              { key: 'gallery',   label: 'Photo Gallery',    icon: ImageIcon,  count: images.length,  active: 'border-blue-700 text-blue-700',   inactive: 'text-slate-500 hover:text-slate-800 border-transparent' },
              { key: 'instagram', label: 'Instagram Feed',   icon: Instagram,  count: igPosts.length, active: 'border-pink-600 text-pink-600',    inactive: 'text-slate-500 hover:text-slate-800 border-transparent' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-1 py-4 mr-6 text-sm font-bold border-b-2 transition-all ${
                  activeTab === tab.key ? tab.active : tab.inactive
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === tab.key ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* ═══ GALLERY TAB ═══ */}
          {activeTab === 'gallery' && (
            <div className="p-6 space-y-6">

              {/* Upload Panel (collapsible) */}
              {showUploadPanel && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-sm">
                      <CloudUpload className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Upload New Image</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Supports file upload or direct URL</p>
                    </div>
                  </div>

                  {uploadMsg && (
                    <div className={`flex items-center gap-2.5 p-3.5 rounded-xl text-xs font-bold border mb-4 ${
                      uploadMsg.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {uploadMsg.type === 'success'
                        ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                        : <AlertCircle className="w-4 h-4 shrink-0" />}
                      {uploadMsg.text}
                    </div>
                  )}

                  <form onSubmit={handleUploadSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

                      {/* Mode + Input */}
                      <div className="md:col-span-2 lg:col-span-1 space-y-2">
                        <label className="block text-[11px] font-black text-slate-600 uppercase tracking-widest">Source</label>
                        <div className="flex gap-1 p-1 bg-white rounded-xl border border-slate-200">
                          {(['file', 'url'] as const).map(m => (
                            <button key={m} type="button" onClick={() => setUploadMode(m)}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                uploadMode === m ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                              }`}>
                              {m === 'file' ? 'File' : 'URL'}
                            </button>
                          ))}
                        </div>
                        {uploadMode === 'file' ? (
                          <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-3 bg-white hover:bg-blue-50/30 transition-all">
                            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" />
                            <Upload className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="text-xs text-slate-500 font-medium truncate">
                              {file ? file.name : 'Choose image…'}
                            </span>
                          </label>
                        ) : (
                          <input type="url" value={urlInput} onChange={e => setUrlInput(e.target.value)}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                        )}
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-black text-slate-600 uppercase tracking-widest">Caption / Title</label>
                        <input type="text" required value={titleInput} onChange={e => setTitleInput(e.target.value)}
                          placeholder="e.g. Keynote Speaker Session"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-black text-slate-600 uppercase tracking-widest">Category</label>
                        <select value={categoryInput} onChange={e => setCategoryInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                          {['Summit', 'Workshop', 'Pitching', 'Hackathon', 'General'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      {/* Featured + Submit */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-black text-slate-600 uppercase tracking-widest">Options</label>
                        <label htmlFor="isFeaturedInput"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-amber-300 hover:bg-amber-50/40 transition-all">
                          <input type="checkbox" id="isFeaturedInput" checked={isFeaturedInput}
                            onChange={e => setIsFeaturedInput(e.target.checked)}
                            className="w-3.5 h-3.5 accent-amber-500 cursor-pointer" />
                          <span className="text-xs font-bold text-slate-700">⭐ Mark as Featured</span>
                        </label>
                        <button type="submit" disabled={uploading}
                          className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                          {uploading
                            ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading…</>
                            : <><CloudUpload className="w-3.5 h-3.5" /> Upload Image</>}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Images Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900">All Photos</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    <span className="text-amber-600 font-bold">{featuredCount} featured</span> · {images.length} total uploaded
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-[11px] font-bold text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Star = featured on public site
                </div>
              </div>

              {/* Images Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-slate-100 rounded-2xl overflow-hidden animate-pulse">
                      <div className="h-40 bg-slate-200" />
                      <div className="p-3 space-y-2">
                        <div className="h-2.5 bg-slate-200 rounded-full w-1/3" />
                        <div className="h-2.5 bg-slate-200 rounded-full w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : images.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Folder className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-bold text-sm">No images uploaded yet</p>
                  <p className="text-slate-400 text-xs font-medium mt-1">Click "Upload Photo" to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {images.map(img => (
                    <div key={img.id}
                      className={`group bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                        img.isFeatured ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                      }`}>
                      {/* Image */}
                      <div className="relative h-44 bg-slate-100 overflow-hidden">
                        <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {/* Overlay actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                          <button onClick={() => toggleFeaturedImage(img.id, img.isFeatured)}
                            className={`p-2.5 rounded-xl border transition-all ${
                              img.isFeatured
                                ? 'bg-amber-400 text-white border-amber-300 shadow'
                                : 'bg-white text-slate-700 border-white hover:text-amber-500'
                            }`} title={img.isFeatured ? 'Unfeature' : 'Feature'}>
                            <Star className={`w-4 h-4 ${img.isFeatured ? 'fill-white' : ''}`} />
                          </button>
                          <button onClick={() => deleteImage(img.id)}
                            className="p-2.5 rounded-xl bg-white text-slate-700 border border-white hover:text-rose-600 transition-all"
                            title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {img.isFeatured && (
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-white text-[10px] font-black shadow">
                            <Star className="w-2.5 h-2.5 fill-white" /> Featured
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="p-3 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">{img.category}</span>
                          <p className="text-xs font-bold text-slate-800 truncate mt-0.5">{img.title}</p>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button onClick={() => toggleFeaturedImage(img.id, img.isFeatured)}
                            className={`p-1.5 rounded-lg transition-all ${
                              img.isFeatured
                                ? 'text-amber-500 bg-amber-50 border border-amber-200'
                                : 'text-slate-400 border border-slate-200 hover:text-amber-500 hover:bg-amber-50'
                            }`}>
                            <Star className={`w-3.5 h-3.5 ${img.isFeatured ? 'fill-amber-400' : ''}`} />
                          </button>
                          <button onClick={() => deleteImage(img.id)}
                            className="p-1.5 rounded-lg text-slate-400 border border-slate-200 hover:text-rose-500 hover:bg-rose-50 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ INSTAGRAM TAB ═══ */}
          {activeTab === 'instagram' && (
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900">Instagram Feed</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Toggle which posts appear on the public homepage.
                    <span className="ml-2 text-pink-600 font-bold">{featuredIgCount} currently visible.</span>
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-slate-100 rounded-2xl overflow-hidden animate-pulse">
                      <div className="h-48 bg-slate-200" />
                      <div className="p-3 space-y-2">
                        <div className="h-2.5 bg-slate-200 rounded-full w-3/4" />
                        <div className="h-2.5 bg-slate-200 rounded-full w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : igPosts.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Instagram className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-bold text-sm">No Instagram posts found</p>
                  <p className="text-slate-400 text-xs font-medium mt-1">Connect your Instagram feed to display posts.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {igPosts.map(post => (
                    <div key={post.id}
                      className={`group bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                        post.isFeatured ? 'border-pink-300 ring-1 ring-pink-200' : 'border-slate-200'
                      }`}>
                      {/* Image */}
                      <div className="relative h-52 bg-slate-100 overflow-hidden">
                        <img src={post.mediaUrl} alt="IG Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black shadow backdrop-blur-sm ${
                          post.isFeatured
                            ? 'bg-pink-600 text-white'
                            : 'bg-black/50 text-white'
                        }`}>
                          {post.isFeatured ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {post.isFeatured ? 'Visible' : 'Hidden'}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-4 space-y-3">
                        <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">{post.caption}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 font-mono">{post.timestamp}</span>
                          <button
                            onClick={() => toggleFeaturedIg(post.id, post.isFeatured)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black border transition-all ${
                              post.isFeatured
                                ? 'bg-pink-600 text-white border-pink-500 hover:bg-pink-700'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50'
                            }`}>
                            {post.isFeatured
                              ? <><EyeOff className="w-3 h-3" /> Hide</>
                              : <><Eye className="w-3 h-3" /> Show on Site</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-slate-200 mt-4">
        <span>© {new Date().getFullYear()} NEC E-Cell · Admin Panel</span>
        <Link to="/" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold transition-colors">
          <Settings2 className="w-3.5 h-3.5" />
          View Public Website
        </Link>
      </footer>
    </div>
  );
}
