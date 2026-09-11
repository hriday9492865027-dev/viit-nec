// Vercel Serverless Function entry point for standalone Backend deployment
const { app, connectDB } = require('../server');

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('[Vercel Backend] MongoDB connection deferred:', err.message);
  }
  return app(req, res);
};
