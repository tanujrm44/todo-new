import express from "express"
import {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo,
  editTodoStatus,
} from "../controllers/todoController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(protect, createTodo).get(protect, getTodos)
router.route("/:id").put(protect, editTodo).delete(protect, deleteTodo)
router.route("/:id/status").put(protect, editTodoStatus)

export default router
