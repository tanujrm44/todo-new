import React from "react"
import {
  Button,
  Card,
  Space,
  Modal,
  Input,
  Form,
  Flex,
  Tooltip,
  Select,
  Popconfirm,
} from "antd"
import { CheckCircleOutlined, PlayCircleOutlined } from "@ant-design/icons"
import {
  useDeleteTodoMutation,
  useEditTodoStatusMutation,
  useEditTodoMutation,
} from "../slices/api/todoApiSlice"
import { useMessage } from "../context/MessageContext"

export default function Todo({ todo, refetch }) {
  const [showTodo, setShowTodo] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const [deleteTodo] = useDeleteTodoMutation()
  const [editTodo] = useEditTodoMutation()
  const [editTodoStatus] = useEditTodoStatusMutation()
  const { showMessage } = useMessage()
  console.log(todo._id)

  const deleteTodoHandler = async (id) => {
    try {
      await deleteTodo(id).unwrap()
      showMessage("Todo deleted successfully", "success")
      refetch()
    } catch (error) {
      showMessage("Something went wrong", "error")
    }
  }

  const editTodoHandler = async (values) => {
    console.log(values)
    try {
      await editTodo({ ...values, id: todo._id }).unwrap()
      showMessage("Todo edited successfully", "success")
      setShowEdit(false)
      refetch()
    } catch (error) {
      showMessage("Something went wrong", "error")
    }
  }

  const editTodoStatusHandler = async (id, status) => {
    console.log(id)
    try {
      await editTodoStatus({ id, status }).unwrap()
      showMessage(
        `Todo marked as ${status === "in-progress" ? "in progress" : "done"}`,
        "success"
      )
      refetch()
    } catch (error) {
      showMessage("Something went wrong", "error")
    }
  }

  return (
    <>
      <Card className="todo">
        <Flex justify="space-between">
          <h3>{todo.title}</h3>
          {todo.status === "not-started" ? (
            <Tooltip title="Start">
              <PlayCircleOutlined
                className="markDone"
                onClick={() => editTodoStatusHandler(todo._id, "in-progress")}
              />
            </Tooltip>
          ) : todo.status === "in-progress" ? (
            <Tooltip title="Mark as done">
              <CheckCircleOutlined
                className="markDone"
                onClick={() => editTodoStatusHandler(todo._id, "done")}
              />
            </Tooltip>
          ) : null}
        </Flex>
        <p
          style={{
            marginBottom: "1rem",
          }}
        >
          {todo.description}
        </p>
        <p>Created At: {todo.createdAt}</p>
        {/* delete edit view details */}
        <Space className="todo-actions">
          <Button
            type="primary"
            className="bgSecColor"
            onClick={() => setShowEdit(true)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this todo?"
            onConfirm={() => deleteTodoHandler(todo._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>

          <Button type="primary" onClick={() => setShowTodo(true)}>
            View Details
          </Button>
        </Space>
      </Card>
      {showTodo && (
        <Modal
          title={todo.title}
          visible={showTodo}
          onCancel={() => setShowTodo(false)}
          footer={[
            <Button key="back" onClick={() => setShowTodo(false)}>
              Close
            </Button>,
          ]}
        >
          <p>{todo.description}</p>
          <p>Created At: {todo.createdAt}</p>
        </Modal>
      )}
      {showEdit && (
        <Modal
          title="Edit Todo"
          visible={showEdit}
          onCancel={() => setShowEdit(false)}
          footer={[]}
        >
          <Form
            layout="vertical"
            onFinish={(values) => editTodoHandler(values)}
          >
            <Form.Item label="Todo" name="title">
              <Input placeholder="Todo" defaultValue={todo.title} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea
                placeholder="Description"
                defaultValue={todo.description}
              />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Select defaultValue={todo.status}>
                <Select.Option value="not-started">Not Started</Select.Option>
                <Select.Option value="in-progress">In Progress</Select.Option>
                <Select.Option value="done">Done</Select.Option>
              </Select>
            </Form.Item>
            <Space>
              <Button key="back" onClick={() => setShowEdit(false)}>
                Close
              </Button>

              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Space>
          </Form>
        </Modal>
      )}
    </>
  )
}
