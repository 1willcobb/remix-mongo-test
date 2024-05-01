import { Schema } from "mongoose"

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date: Date) => date.toLocaleDateString("en-US"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

export default reactionSchema