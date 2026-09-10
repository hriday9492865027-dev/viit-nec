const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['upcoming', 'past'],
      default: 'upcoming',
      index: true,
    },
    date: {
      type: String,
      default: 'Date To Be Announced',
    },
    location: {
      type: String,
      default: 'VIIT Campus',
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
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

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
