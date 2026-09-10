const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: 'Event Highlights',
    },
    category: {
      type: String,
      default: 'General',
      index: true,
    },
    url: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    uploadedAt: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    eventCode: {
      type: String,
      trim: true,
      default: '',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema);
