'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GalleryImage, InstagramPost } from '@/types';
import { Upload, Star, Trash2, ArrowLeft, Image as ImageIcon, Instagram } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'instagram'>('gallery');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [igPosts, setIgPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload Form State
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Summit');
  const [isFeaturedInput, setIsFeaturedInput] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [galRes, igRes] = await Promise.all([
        fetch('/api/gallery'),
        fetch('/api/instagram'),
      ]);
      const galData = await galRes.json();
      const igData = await igRes.json();

      if (galData.success) setImages(galData.images);
      if (igData.success) setIgPosts(igData.posts);
    } catch (err) {
      console.error('Error fetching admin data:', err);
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
      if (uploadMode === 'file' && file) {
        formData.append('file', file);
      } else if (uploadMode === 'url' && urlInput) {
        formData.append('url', urlInput);
      } else {
        setUploadMsg({ type: 'error', text: 'Please select an image file or provide a valid URL.' });
        setUploading(false);
        return;
      }

      formData.append('title', titleInput || 'Untitled Image');
      formData.append('category', categoryInput);
      formData.append('isFeatured', isFeaturedInput ? 'true' : 'false');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUploadMsg({ type: 'success', text: 'Image uploaded successfully!' });
        setFile(null);
        setUrlInput('');
        setTitleInput('');
        fetchData();
      } else {
        setUploadMsg({ type: 'error', text: data.message || 'Upload failed' });
      }
    } catch (err) {
      setUploadMsg({ type: 'error', text: 'An unexpected error occurred during upload.' });
    } finally {
      setUploading(false);
    }
  };

  const toggleFeaturedImage = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isFeatured: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setImages(images.map((img) => (img.id === id ? { ...img, isFeatured: !currentStatus } : img)));
      }
    } catch (err) {
      console.error('Error toggling featured image:', err);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setImages(images.filter((img) => img.id !== id));
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  const toggleFeaturedIg = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/instagram', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isFeatured: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setIgPosts(igPosts.map((p) => (p.id === id ? { ...p, isFeatured: !currentStatus } : p)));
      }
    } catch (err) {
      console.error('Error toggling instagram post status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Website
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border border-blue-200">
                  ⚙️
                </span>
                Gallery & Content Admin Panel
              </h1>
              <p className="text-slate-600 text-sm sm:text-base font-normal">
                Upload new event pictures, toggle which photos display on the public gallery, and filter Instagram posts.
              </p>
            </div>

            {/* Tab Switches */}
            <div className="flex items-center p-1.5 bg-white rounded-xl border border-slate-200 self-start md:self-auto shadow-sm">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-slate-600 hover:text-blue-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Photo Gallery ({images.length})
              </button>
              <button
                onClick={() => setActiveTab('instagram')}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg transition-all ${
                  activeTab === 'instagram'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                <Instagram className="w-4 h-4" />
                Instagram Posts ({igPosts.length})
              </button>
            </div>
          </div>

          {activeTab === 'gallery' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Left Column: Upload Form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 h-fit shadow-sm">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-blue-950 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-700" />
                    Upload Image
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Upload an image file or provide an external image URL.
                  </p>
                </div>

                {uploadMsg && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-bold ${
                      uploadMsg.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {uploadMsg.text}
                  </div>
                )}

                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  {/* Mode Selector */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setUploadMode('file')}
                      className={`py-2 rounded-lg font-bold transition-colors ${
                        uploadMode === 'file' ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      File Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('url')}
                      className={`py-2 rounded-lg font-bold transition-colors ${
                        uploadMode === 'url' ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      URL Link
                    </button>
                  </div>

                  {uploadMode === 'file' ? (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Select File
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-700 file:text-white hover:file:bg-blue-800"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Image Title / Caption
                    </label>
                    <input
                      type="text"
                      required
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder="e.g. Keynote Speaker Session"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Category Tag
                    </label>
                    <select
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-medium"
                    >
                      <option value="Summit">Summit</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Pitching">Pitching</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="isFeaturedInput"
                      checked={isFeaturedInput}
                      onChange={(e) => setIsFeaturedInput(e.target.checked)}
                      className="w-4 h-4 accent-blue-700 rounded cursor-pointer"
                    />
                    <label htmlFor="isFeaturedInput" className="text-xs font-semibold text-slate-700 cursor-pointer">
                      Mark as Featured (Display immediately on public homepage)
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
                  >
                    {uploading ? 'Processing Upload...' : 'Upload & Save Image'}
                  </button>
                </form>

              </div>

              {/* Right Column: Image List & Featured Toggle Panel */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-blue-950">Uploaded Photos Management</h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Click the star icon to toggle <strong className="text-amber-600 font-bold">Featured</strong> status.
                  </span>
                </div>

                {images.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                    No images uploaded yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className={`bg-white p-4 rounded-2xl border flex gap-4 items-center justify-between transition-all shadow-sm ${
                          img.isFeatured ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200'
                        }`}
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 space-y-1 overflow-hidden">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700 border border-slate-200">
                            {img.category || 'General'}
                          </span>
                          <h4 className="text-xs font-bold text-blue-950 truncate">{img.title}</h4>
                          <p className="text-[10px] text-slate-400 font-mono">{img.uploadedAt}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Toggle Featured Button */}
                          <button
                            onClick={() => toggleFeaturedImage(img.id, img.isFeatured)}
                            className={`p-2.5 rounded-xl border transition-all ${
                              img.isFeatured
                                ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-sm'
                                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-amber-600'
                            }`}
                            title={img.isFeatured ? 'Featured on public site' : 'Mark as Featured'}
                          >
                            <Star className={`w-4 h-4 ${img.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteImage(img.id)}
                            className="p-2.5 rounded-xl bg-slate-50 text-slate-400 border border-slate-200 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          ) : (
            /* Instagram Posts Management Tab */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-blue-950">Instagram Feed Manager</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Select which Instagram posts to display on the public homepage feed.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {igPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`bg-white rounded-2xl border p-4 flex flex-col justify-between space-y-4 shadow-sm ${
                      post.isFeatured ? 'border-pink-400 bg-pink-50/10' : 'border-slate-200'
                    }`}
                  >
                    <div className="relative h-48 w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                      <img src={post.mediaUrl} alt="IG post" className="w-full h-full object-cover" />
                    </div>

                    <p className="text-xs text-slate-700 line-clamp-2 font-normal">{post.caption}</p>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">{post.timestamp}</span>
                      <button
                        onClick={() => toggleFeaturedIg(post.id, post.isFeatured)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          post.isFeatured
                            ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
                        }`}
                      >
                        {post.isFeatured ? 'Featured on Public Site' : 'Select to Display'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
