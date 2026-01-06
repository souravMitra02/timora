import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: String, 
      required: true,
    },

    startTime: {
      type: String, 
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "missed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", taskSchema);

export default Task;

