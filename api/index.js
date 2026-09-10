// Vercel Serverless Function entry point
const { app, connectDB } = require('../Backend/server');

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('[Vercel API] MongoDB connection deferred:', err.message);
  }
  return app(req, res);
};
