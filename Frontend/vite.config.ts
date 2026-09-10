import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import http from 'http';

function apiDevServerPlugin(): Plugin {
  const getGalleryPath = () => {
    const p1 = path.resolve(__dirname, 'data/gallery.json');
    if (fs.existsSync(p1)) return p1;
    const p2 = path.resolve(__dirname, '../data/gallery.json');
    if (fs.existsSync(p2)) return p2;
    return p1;
  };

  const getEventsPath = () => {
    const p1 = path.resolve(__dirname, 'data/events.json');
    if (fs.existsSync(p1)) return p1;
    const p2 = path.resolve(__dirname, '../data/events.json');
    if (fs.existsSync(p2)) return p2;
    return p1;
  };

  const getInstagramPath = () => {
    const p1 = path.resolve(__dirname, 'data/instagram.json');
    if (fs.existsSync(p1)) return p1;
    const p2 = path.resolve(__dirname, '../data/instagram.json');
    if (fs.existsSync(p2)) return p2;
    return p1;
  };

  const readJson = (filePath: string, fallback: any = []) => {
    try {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
    } catch (e) {
      console.error('Error reading JSON:', e);
    }
    return fallback;
  };

  const writeJson = (filePath: string, data: any) => {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Error writing JSON:', e);
      return false;
    }
  };

  return {
    name: 'vite-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        // ─── First: Try Proxying to Persistent Backend (Port 5000) ───
        const proxyReq = http.request(
          {
            hostname: '127.0.0.1',
            port: 5000,
            path: req.url,
            method: req.method,
            headers: req.headers,
          },
          (proxyRes) => {
            res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
            proxyRes.pipe(res);
          }
        );

        proxyReq.on('error', async () => {
          // Backend is offline on port 5000 — fall back to local dev JSON handlers
          const urlObj = new URL(req.url || '/', 'http://localhost');
          const pathname = urlObj.pathname;
          const method = req.method?.toUpperCase();

          const sendJson = (data: any, status = 200) => {
            res.statusCode = status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          const getBody = (): Promise<any> => {
            return new Promise((resolve) => {
              let body = '';
              req.on('data', (chunk) => { body += chunk; });
              req.on('end', () => {
                try {
                  resolve(body ? JSON.parse(body) : {});
                } catch {
                  resolve({});
                }
              });
            });
          };

          // ─── Fallback: /api/events ───
          if (pathname === '/api/events') {
            const eventsFile = getEventsPath();
            let events = readJson(eventsFile, []);
            if (method === 'GET') {
              return sendJson({ success: true, count: events.length, events, source: 'offline_fallback' });
            }
            if (method === 'POST') {
              const body = await getBody();
              const newEvent = {
                id: body.id || `event-${Date.now()}`,
                title: body.title || 'Untitled Event',
                category: body.category || 'upcoming',
                date: body.date || 'Date TBA',
                location: body.location || 'VIIT Campus',
                description: body.description || '',
                imageUrl: body.imageUrl || '',
                link: body.link || '',
              };
              events.unshift(newEvent);
              writeJson(eventsFile, events);
              return sendJson({ success: true, event: newEvent }, 201);
            }
          }

          if (pathname.startsWith('/api/events/')) {
            const id = pathname.replace('/api/events/', '');
            const eventsFile = getEventsPath();
            let events = readJson(eventsFile, []);
            if (method === 'PATCH') {
              const body = await getBody();
              const idx = events.findIndex((e: any) => e.id === id);
              if (idx !== -1) {
                events[idx] = { ...events[idx], ...body };
                writeJson(eventsFile, events);
                return sendJson({ success: true, event: events[idx] });
              }
              return sendJson({ success: false, message: 'Event not found' }, 404);
            }
            if (method === 'DELETE') {
              events = events.filter((e: any) => e.id !== id);
              writeJson(eventsFile, events);
              return sendJson({ success: true, message: 'Event deleted' });
            }
          }

          // ─── Fallback: /api/gallery ───
          if (pathname === '/api/gallery') {
            const galleryFile = getGalleryPath();
            let images = readJson(galleryFile, []);

            if (method === 'GET') {
              const featuredOnly = urlObj.searchParams.get('featured') === 'true';
              if (featuredOnly) {
                images = images.filter((img: any) => img.isFeatured);
              }
              return sendJson({ success: true, images, source: 'offline_fallback' });
            }

            if (method === 'POST') {
              const body = await getBody();
              const photoList = Array.isArray(body.images) && body.images.length > 0 ? body.images : (body.url ? [body.url] : []);
              const newImage = {
                id: body.id || `img-${Date.now()}`,
                title: body.title || 'Gallery Photo',
                category: body.category || 'General',
                url: body.url || (photoList[0] || ''),
                images: photoList,
                isFeatured: Boolean(body.isFeatured),
                uploadedAt: body.uploadedAt || new Date().toISOString().split('T')[0],
              };
              images.unshift(newImage);
              writeJson(galleryFile, images);
              return sendJson({ success: true, image: newImage }, 201);
            }

            if (method === 'PATCH') {
              const body = await getBody();
              const id = body.id || urlObj.searchParams.get('id');
              const idx = images.findIndex((img: any) => img.id === id);
              if (idx === -1) {
                return sendJson({ success: false, message: 'Image not found' }, 404);
              }
              if (typeof body.isFeatured === 'boolean') images[idx].isFeatured = body.isFeatured;
              if (body.title) images[idx].title = body.title;
              if (body.category) images[idx].category = body.category;
              writeJson(galleryFile, images);
              return sendJson({ success: true, image: images[idx] });
            }

            if (method === 'DELETE') {
              const id = urlObj.searchParams.get('id');
              if (!id) return sendJson({ success: false, message: 'ID required' }, 400);
              images = images.filter((img: any) => img.id !== id);
              writeJson(galleryFile, images);
              return sendJson({ success: true, images });
            }
          }

          if (pathname.startsWith('/api/gallery/')) {
            const id = pathname.replace('/api/gallery/', '');
            const galleryFile = getGalleryPath();
            let images = readJson(galleryFile, []);
            if (method === 'PATCH') {
              const body = await getBody();
              const idx = images.findIndex((img: any) => img.id === id);
              if (idx !== -1) {
                images[idx] = { ...images[idx], ...body };
                writeJson(galleryFile, images);
                return sendJson({ success: true, image: images[idx] });
              }
              return sendJson({ success: false, message: 'Image not found' }, 404);
            }
            if (method === 'DELETE') {
              images = images.filter((img: any) => img.id !== id);
              writeJson(galleryFile, images);
              return sendJson({ success: true, message: 'Image deleted' });
            }
          }

          // ─── Fallback: /api/upload ───
          if (pathname === '/api/upload' && method === 'POST') {
            const body = await getBody();
            const galleryFile = getGalleryPath();
            const images = readJson(galleryFile, []);
            const photoList = Array.isArray(body.images) && body.images.length > 0 ? body.images : (body.url ? [body.url] : []);
            const newImage = {
              id: body.id || `img-${Date.now()}`,
              title: body.title || 'Gallery Photo',
              category: body.category || 'General',
              url: body.url || (photoList[0] || ''),
              images: photoList,
              isFeatured: Boolean(body.isFeatured),
              uploadedAt: body.uploadedAt || new Date().toISOString().split('T')[0],
            };
            images.unshift(newImage);
            writeJson(galleryFile, images);
            return sendJson({ success: true, image: newImage }, 201);
          }

          // ─── Fallback: /api/instagram ───
          if (pathname === '/api/instagram') {
            const igFile = getInstagramPath();
            let posts = readJson(igFile, []);
            if (method === 'GET') {
              return sendJson({ success: true, posts });
            }
          }

          // ─── Fallback: /api/health ───
          if (pathname === '/api/health') {
            return sendJson({
              status: 'ok',
              mode: 'Vite Dev Fallback (Backend offline on port 5000)',
              info: 'Start backend with: cd Backend && npm run dev',
            });
          }

          sendJson({
            success: false,
            error: 'Backend is offline on port 5000 and no local fallback handler matched this route.',
          }, 503);
        });

        req.pipe(proxyReq);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiDevServerPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
