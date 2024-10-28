import path from "path"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import passport from "./utils/passport.js"

dotenv.config()

connectDB()

const PORT = process.env.PORT || 8080

export const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  next()
})

// cors
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
)

app.use(cookieParser())
passport(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/todo", todoRoutes)

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, "/client/dist")))
  app.use("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...")
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
