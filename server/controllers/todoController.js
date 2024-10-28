import asyncHandler from "express-async-handler"
import Todo from "../models/todoModel.js"

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    res.status(400)
    throw new Error("Title and Description are required")
  }

  await Todo.create({ user: req.user, title, description })

  res.status(201).json({ title, description })
})

const getTodos = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user._id : null

  if (!userId) {
    res.status(400).json({ message: "User not authenticated" })
    return
  }

  const searchFilter = req.query.term
    ? {
        name: {
          $regex: req.query.term,
          $options: "i",
        },
      }
    : {}

  // Get the field to sort by and sort direction from the query parameters
  const sortField = req.query.sortField || "createdAt" // default to 'createdAt'
  const sortDirection = req.query.sort === "desc" ? -1 : 1
  const sortOption = {}
  sortOption[sortField] = sortDirection

  try {
    const todos = await Todo.find({ user: userId, ...searchFilter }).sort(
      sortOption
    )
    res.json(todos)
  } catch (error) {
    console.error("Error fetching todos:", error)
    res.status(500).json({ message: "Error fetching todos" })
  }
})

const editTodo = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body

  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(404)
    throw new Error("Todo not found")
  }

  if (title !== undefined) {
    todo.title = title
  }
  if (description !== undefined) {
    todo.description = description
  }
  if (status !== undefined) {
    todo.status = status
  }

  const updatedTodo = await todo.save()

  res.json(updatedTodo)
})

const editTodoStatus = asyncHandler(async (req, res) => {
  const { status } = req.body

  if (!status) {
    res.status(400)
    throw new Error("Status is required")
  }

  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(404)
    throw new Error("Todo not found")
  }

  todo.status = status

  const updatedTodo = await todo.save()

  res.json(updatedTodo)
})

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (todo) {
    await Todo.findByIdAndDelete(req.params.id)
    res.json({ message: "Todo removed" })
  } else {
    res.status(404)
    throw new Error("Todo not found")
  }
})

export { createTodo, getTodos, editTodo, deleteTodo, editTodoStatus }
