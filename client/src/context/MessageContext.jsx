import React, { createContext, useContext } from "react"
import { message } from "antd"

const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
  const showMessage = (content, variant = "info") => {
    message[variant](content)
  }

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessage = () => {
  const context = useContext(MessageContext)
  return context
}
