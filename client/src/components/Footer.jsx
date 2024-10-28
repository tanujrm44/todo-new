import React from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>Todo App &copy; {currentYear}</p>
    </footer>
  )
}
