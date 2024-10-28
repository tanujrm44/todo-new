import mongoose from "mongoose"

const todoModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "not-started",
      enum: ["not-started", "in-progress", "done"],
    },
  },
  {
    timestamps: true,
  }
)

const Todo = mongoose.model("Todo", todoModel)

export default Todo
