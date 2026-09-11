const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nec_ecell';
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'viitnec@gmail.com';

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Import Mongoose models
const ContactMessage = require('./models/ContactMessage');
const Event = require('./models/Event');
const GalleryItem = require('./models/GalleryItem');

// ─── JSON File Fallback Helpers ───
function resolveDataFile(fileName) {
  const candidates = [
    path.resolve(__dirname, '../data', fileName),
    path.resolve(__dirname, 'data', fileName),
    path.resolve(__dirname, '../Frontend/data', fileName),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return candidates[0];
}

function readJsonFile(fileName, fallback = []) {
  try {
    const filePath = resolveDataFile(fileName);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.warn(`[File Fallback] Warning reading ${fileName}:`, err.message);
  }
  return fallback;
}

function writeJsonFile(fileName, data) {
  try {
    const filePath = resolveDataFile(fileName);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn(`[File Fallback] Warning writing ${fileName}:`, err.message);
    return false;
  }
}

// ─── Database Connection & Auto-Seeding ───
let isDbConnected = false;
let connPromise = null;

async function connectDB() {
  if (isDbConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connPromise) {
    return connPromise;
  }

  connPromise = mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  }).then(async (conn) => {
    isDbConnected = true;
    console.log('✅ Connected to MongoDB successfully:', MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));
    return conn;
  }).catch((err) => {
    isDbConnected = false;
    connPromise = null;
    console.warn('⚠️  MongoDB connection warning:', err.message);
    console.log('💡 Running with local JSON persistence until MongoDB is reachable.');
    return null;
  });

  return connPromise;
}

connectDB();

mongoose.connection.on('disconnected', () => {
  isDbConnected = false;
  connPromise = null;
  console.warn('⚠️  MongoDB disconnected. Attempting reconnection in 60 seconds...');
  setTimeout(connectDB, 60000);
});

// Configure Nodemailer
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// ─── Health Check Endpoint ───
app.get('/api/health', async (req, res) => {
  const isMongoReady = mongoose.connection.readyState === 1;
  let eventCount = 0;
  let galleryCount = 0;

  if (isMongoReady) {
    try {
      eventCount = await Event.countDocuments();
      galleryCount = await GalleryItem.countDocuments();
    } catch {}
  } else {
    eventCount = readJsonFile('events.json', []).length;
    galleryCount = readJsonFile('gallery.json', []).length;
  }

  res.json({
    status: 'ok',
    uptime: process.uptime(),
    database: {
      type: isMongoReady ? 'MongoDB' : 'Local JSON Fallback',
      connected: isMongoReady,
      readyState: mongoose.connection.readyState,
    },
    counts: {
      events: eventCount,
      gallery: galleryCount,
    },
    emailConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
    recipientEmail: RECIPIENT_EMAIL,
  });
});

// ═════════════════════════════════════════════════════════════════
// ─── EVENTS API (/api/events) ───
// ═════════════════════════════════════════════════════════════════

// GET /api/events (Fetch all events)
app.get('/api/events', async (req, res) => {
  try {
    const isMongoReady = mongoose.connection.readyState === 1;

    if (isMongoReady) {
      const events = await Event.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: events.length, events, source: 'database' });
    }

    // Fallback to JSON file
    const events = readJsonFile('events.json', []);
    return res.json({ success: true, count: events.length, events, source: 'fallback_file' });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/events (Create new event)
app.post('/api/events', async (req, res) => {
  try {
    const { id, title, category, date, location, description, imageUrl, link, eventCode } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Event title is required' });
    }

    const eventId = id || `event-${Date.now()}`;
    const newEventData = {
      id: eventId,
      title: title.trim(),
      category: ['upcoming', 'past'].includes(category) ? category : 'upcoming',
      date: (date && date.trim()) || 'Date To Be Announced',
      location: (location && location.trim()) || 'VIIT Campus',
      description: (description && description.trim()) || 'Entrepreneurship event organized by NEC E-Cell VIIT.',
      imageUrl: (imageUrl && imageUrl.trim()) || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      link: (link && link.trim()) || '',
      eventCode: (eventCode && eventCode.trim().toUpperCase()) || '',
    };

    let createdDoc = null;
    const isMongoReady = mongoose.connection.readyState === 1;

    if (isMongoReady) {
      createdDoc = await Event.findOneAndUpdate(
        { id: eventId },
        newEventData,
        { upsert: true, new: true }
      );
      console.log(`📅 Created/Updated event in MongoDB: "${newEventData.title}" [ID: ${eventId}]`);
    }

    // Sync to file fallback as well
    const fileEvents = readJsonFile('events.json', []);
    const filtered = fileEvents.filter((e) => e.id !== eventId);
    writeJsonFile('events.json', [newEventData, ...filtered]);

    return res.status(201).json({
      success: true,
      message: 'Event successfully published!',
      event: createdDoc || newEventData,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/events/:id (Toggle category or update event)
app.patch('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.eventCode !== undefined) {
      updates.eventCode = updates.eventCode ? updates.eventCode.trim().toUpperCase() : '';
    }
    const isMongoReady = mongoose.connection.readyState === 1;

    let updated = null;
    if (isMongoReady) {
      updated = await Event.findOneAndUpdate({ id }, updates, { new: true });
    }

    // Also update file fallback
    const fileEvents = readJsonFile('events.json', []);
    const idx = fileEvents.findIndex((e) => e.id === id);
    if (idx !== -1) {
      fileEvents[idx] = { ...fileEvents[idx], ...updates };
      writeJsonFile('events.json', fileEvents);
      if (!updated) updated = fileEvents[idx];
    }

    if (!updated && !isMongoReady && idx === -1) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    return res.json({ success: true, event: updated });
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/events/:id (Delete event)
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isMongoReady = mongoose.connection.readyState === 1;

    if (isMongoReady) {
      await Event.findOneAndDelete({ id });
    }

    // Also remove from file fallback
    const fileEvents = readJsonFile('events.json', []);
    const filtered = fileEvents.filter((e) => e.id !== id);
    writeJsonFile('events.json', filtered);

    return res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ═════════════════════════════════════════════════════════════════
// ─── GALLERY API (/api/gallery & /api/upload) ───
// ═════════════════════════════════════════════════════════════════

// GET /api/gallery (Fetch gallery items)
app.get('/api/gallery', async (req, res) => {
  try {
    const featuredOnly = req.query.featured === 'true';
    const eventCodeQuery = req.query.eventCode ? req.query.eventCode.trim().toUpperCase() : null;
    const isMongoReady = mongoose.connection.readyState === 1;

    if (isMongoReady) {
      const query = {};
      if (featuredOnly) query.isFeatured = true;
      if (eventCodeQuery) query.eventCode = new RegExp('^' + eventCodeQuery + '$', 'i');
      const items = await GalleryItem.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: items.length, images: items, source: 'database' });
    }

    // Fallback to JSON file
    let images = readJsonFile('gallery.json', []);
    if (featuredOnly) {
      images = images.filter((img) => img.isFeatured);
    }
    if (eventCodeQuery) {
      images = images.filter((img) => img.eventCode && img.eventCode.toUpperCase() === eventCodeQuery);
    }
    return res.json({ success: true, count: images.length, images, source: 'fallback_file' });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Helper to save gallery image
async function createGalleryItem(payload) {
  const { id, title, category, url, images, isFeatured, uploadedAt, eventCode } = payload;
  const photoId = id || `img-${Date.now()}`;

  const photoList = Array.isArray(images) && images.length > 0
    ? images
    : (url ? [url] : []);

  const primaryUrl = (url && url.trim()) || (photoList.length > 0 ? photoList[0] : '');

  const newGalleryData = {
    id: photoId,
    title: (title && title.trim()) || (photoList.length > 1 ? `Event Highlights (${photoList.length} Photos)` : 'Gallery Photo'),
    category: (category && category.trim()) || 'General',
    url: primaryUrl,
    images: photoList,
    isFeatured: Boolean(isFeatured),
    uploadedAt: uploadedAt || new Date().toISOString().split('T')[0],
    eventCode: (eventCode && eventCode.trim().toUpperCase()) || '',
  };

  let createdDoc = null;
  const isMongoReady = mongoose.connection.readyState === 1;

  if (isMongoReady) {
    createdDoc = await GalleryItem.findOneAndUpdate(
      { id: photoId },
      newGalleryData,
      { upsert: true, new: true }
    );
    console.log(`🖼️ Saved gallery card to MongoDB: "${newGalleryData.title}" (${newGalleryData.images.length} photos) [ID: ${photoId}]`);
  }

  // Sync to file fallback
  const fileGallery = readJsonFile('gallery.json', []);
  const filtered = fileGallery.filter((g) => g.id !== photoId);
  writeJsonFile('gallery.json', [newGalleryData, ...filtered]);

  return createdDoc || newGalleryData;
}

// POST /api/gallery
app.post('/api/gallery', async (req, res) => {
  try {
    const item = await createGalleryItem(req.body);
    return res.status(201).json({ success: true, message: 'Photo uploaded successfully!', image: item });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/upload (Alias for gallery upload)
app.post('/api/upload', async (req, res) => {
  try {
    const item = await createGalleryItem(req.body);
    return res.status(201).json({ success: true, message: 'Photo uploaded successfully!', image: item });
  } catch (error) {
    console.error('Error in /api/upload handler:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/gallery/:id? (Supports id in URL or JSON body)
app.patch('/api/gallery/:id?', async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Gallery item ID is required' });
    }
    const updates = req.body;
    const isMongoReady = mongoose.connection.readyState === 1;

    let updated = null;
    if (isMongoReady) {
      updated = await GalleryItem.findOneAndUpdate({ id }, updates, { new: true });
    }

    const fileGallery = readJsonFile('gallery.json', []);
    const idx = fileGallery.findIndex((g) => g.id === id);
    if (idx !== -1) {
      fileGallery[idx] = { ...fileGallery[idx], ...updates };
      writeJsonFile('gallery.json', fileGallery);
      if (!updated) updated = fileGallery[idx];
    }

    if (!updated && !isMongoReady && idx === -1) {
      return res.status(404).json({ success: false, error: 'Gallery item not found' });
    }

    return res.json({ success: true, image: updated });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/gallery/:id or DELETE /api/gallery?id=...
app.delete('/api/gallery/:id?', async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Photo ID is required' });
    }

    const isMongoReady = mongoose.connection.readyState === 1;
    if (isMongoReady) {
      await GalleryItem.findOneAndDelete({ id });
    }

    const fileGallery = readJsonFile('gallery.json', []);
    const filtered = fileGallery.filter((g) => g.id !== id);
    writeJsonFile('gallery.json', filtered);

    return res.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ─── GET /api/instagram ───
app.get('/api/instagram', (req, res) => {
  const posts = readJsonFile('instagram.json', []);
  res.json({ success: true, count: posts.length, posts });
});

// ═════════════════════════════════════════════════════════════════
// ─── CONTACT FORM API (/api/contact) ───
// ═════════════════════════════════════════════════════════════════

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }
    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required' });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = (subject && subject.trim()) ? subject.trim() : 'General Inquiry';
    const cleanMessage = message.trim();
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    let savedDoc = null;

    if (mongoose.connection.readyState === 1) {
      savedDoc = await ContactMessage.create({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
        ipAddress: typeof clientIp === 'string' ? clientIp.split(',')[0].trim() : null,
      });
      console.log(`📥 Saved new inquiry from "${cleanName}" (${cleanEmail}) to MongoDB [ID: ${savedDoc._id}]`);
    } else {
      console.warn('⚠️ MongoDB is not currently reachable; message logged in console.');
    }

    const transporter = createTransporter();
    let emailSent = false;
    let emailError = null;

    if (transporter) {
      const fromName = process.env.SMTP_FROM_NAME || 'NEC E-Cell Portal';
      const fromAddress = process.env.SMTP_USER;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #183A37; color: #EFD6AC; padding: 28px 32px; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
            .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.85; }
            .content { padding: 32px; }
            .field-group { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 4px; }
            .value { font-size: 14px; font-weight: 600; color: #0f172a; }
            .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #183A37; border-radius: 8px; padding: 18px; margin-top: 12px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #334155; }
            .footer { background: #f1f5f9; padding: 18px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NEC E-Cell Contact Notification</h1>
              <p>A new inquiry was submitted via the official website contact form</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Sender Name</div>
                <div class="value">${cleanName}</div>
              </div>
              <div class="field-group">
                <div class="label">Sender Email</div>
                <div class="value"><a href="mailto:${cleanEmail}">${cleanEmail}</a></div>
              </div>
              <div class="field-group">
                <div class="label">Subject</div>
                <div class="value">${cleanSubject}</div>
              </div>
              <div class="field-group">
                <div class="label">Message</div>
                <div class="message-box">${cleanMessage}</div>
              </div>
            </div>
            <div class="footer">
              Sent automatically from NEC E-Cell Website Portal • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
          </div>
        </body>
        </html>
      `;

      try {
        await transporter.sendMail({
          from: `"${fromName}" <${fromAddress}>`,
          to: RECIPIENT_EMAIL,
          replyTo: `"${cleanName}" <${cleanEmail}>`,
          subject: `[NEC E-Cell Inquiry] ${cleanSubject} - from ${cleanName}`,
          text: `New Contact Submission:\n\nFrom: ${cleanName} (${cleanEmail})\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
          html: htmlContent,
        });
        emailSent = true;
        console.log(`✉️ Email dispatched to ${RECIPIENT_EMAIL} for inquiry from ${cleanEmail}`);
      } catch (err) {
        emailError = err.message;
        console.error('❌ Failed to dispatch email via Nodemailer:', err.message);
      }
    }

    if (savedDoc) {
      savedDoc.emailSent = emailSent;
      savedDoc.emailError = emailError;
      await savedDoc.save();
    }

    return res.status(200).json({
      success: true,
      message: emailSent
        ? 'Your message was successfully sent and recorded!'
        : 'Your message was recorded in the database!',
      data: {
        id: savedDoc ? savedDoc._id : null,
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        emailSent,
        createdAt: savedDoc ? savedDoc.createdAt : new Date(),
      },
    });
  } catch (error) {
    console.error('Error in /api/contact handler:', error);
    return res.status(500).json({ success: false, error: 'An internal server error occurred.' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        messages: [],
        warning: 'MongoDB is currently disconnected. Start MongoDB to view stored messages.',
      });
    }

    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100);
    return res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/contact/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const updated = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Message not found' });
    return res.json({ success: true, message: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Message not found' });
    return res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Start listening if run directly (active)
let server = null;
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  server = app.listen(PORT, () => {
    console.log(`🚀 NEC E-Cell Backend listening on http://localhost:${PORT}`);
    console.log(`📧 Configured contact recipient email: ${RECIPIENT_EMAIL}`);
  });
}

module.exports = { app, server, connectDB };
