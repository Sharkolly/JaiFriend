import { Schema, model } from "mongoose";

const performanceDetails = new Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    ctr: { type: Number, default: 0 }, // click-through rate
    cpc: { type: Number, default: 0 }, // cost per click
    cpm: { type: Number, default: 0 }, // cost per 1000 impressions
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Performance = model("Performance", performanceDetails);

export default Performance;
