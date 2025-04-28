import { Schema, model } from "mongoose";

const campaignDetails = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: String,
        description: String,
        adType: { type: String }, // e.g., banner, video, carousel, story
        media: [String], // URLs to images or videos
        targetUrl: String,
        targeting: {
          location: [String],
          demographics: {
            gender: String,
            ageRange: [Number]
          },
          interests: [String],
          deviceType: String
        },
        budget: Number,
        amountSpent: { type: Number, default: 0 },
        startDate: Date,
        endDate: Date,
        status: { type: String, default: 'pending' }, // pending, active, paused, completed
        createdAt: { type: Date, default: Date.now }
      },
      
  { timestamps: true }
);

const Campaign = model("Campaign", campaignDetails);

export default Campaign;