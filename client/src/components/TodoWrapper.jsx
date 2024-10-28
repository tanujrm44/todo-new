import React from "react"
import { Card, Empty } from "antd"
import Todo from "./Todo"

export default function TodoWrapper({ header, status, todos, refetch }) {
  return (
    <Card>
      <h2 className="todo-header">{header}</h2>
      {todos
        ?.filter((todo) => todo.status === status)
        .map((todo) => (
          <Todo key={todo._id} todo={todo} refetch={refetch} />
        ))}
      {todos?.filter((todo) => todo.status === status).length === 0 && (
        <Empty
          style={{
            marginTop: "2rem",
          }}
          description="No todos"
        />
      )}
    </Card>
  )
}
