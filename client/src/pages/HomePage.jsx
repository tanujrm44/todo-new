import React from "react"
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Modal,
  Space,
} from "antd"
import TodoWrapper from "../components/TodoWrapper"
import { useCreateTodoMutation } from "../slices/api/todoApiSlice"
import { useMessage } from "../context/MessageContext"
import { useGetTodosQuery } from "../slices/api/todoApiSlice"
import { useDebounce } from "use-debounce"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../constants"
import { setCredentials } from "../slices/userSlice"
import { useDispatch } from "react-redux"

export default function HomePage() {
  const { userInfo } = useSelector((state) => state.user)
  const { showMessage } = useMessage()
  const dispatch = useDispatch()

  const [showAddTask, setShowAddTask] = React.useState(false)
  const [term, setTerm] = React.useState("")
  const [sort, setSort] = React.useState("asc")

  const [addTodo] = useCreateTodoMutation()
  const [debouncedTerm] = useDebounce(term, 500)
  const { data: todos, refetch } = useGetTodosQuery({
    term: debouncedTerm,
    sort,
  })

  const getUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
        withCredentials: true,
      })
      console.log(res)
      dispatch(
        setCredentials({
          ...res.data.user._json,
          _id: res.data._id,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleAddTodo = async (values) => {
    console.log(values)
    try {
      await addTodo({
        title: values.title,
        description: values.description,
      }).unwrap()
      showMessage("Task added successfully", "success")
      setShowAddTask(false)
      refetch()
    } catch (error) {
      showMessage("Something went wrong", "error")
    }
  }
  return (
    <div className="container">
      <Button
        type="primary"
        style={{
          marginTop: "1rem",
        }}
        onClick={() => setShowAddTask(true)}
      >
        Add Task
      </Button>
      <Card
        style={{
          padding: "0rem",
          marginTop: "1rem",
        }}
      >
        <Form>
          <Flex justify="space-between" wrap>
            <Form.Item
              name={"search"}
              label="Search"
              style={{
                marginBottom: 0,
                width: "500px",
              }}
            >
              <Input onChange={(e) => setTerm(e.target.value)} value={term} />
            </Form.Item>

            {/* sort by */}
            <Form.Item
              name={"sort"}
              label="Sort By"
              style={{ marginBottom: 0, width: "200px" }}
            >
              <Select
                defaultValue="asc"
                onChange={(value) => setSort(value)}
                value={sort}
              >
                <Select.Option value="asc">Recent</Select.Option>
                <Select.Option value="desc">Old</Select.Option>
              </Select>
            </Form.Item>
          </Flex>
        </Form>
      </Card>
      <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
        <Col md={8} sm={24}>
          <TodoWrapper
            header="Todo"
            status={"not-started"}
            todos={todos}
            refetch={refetch}
          />
        </Col>
        <Col md={8} sm={24}>
          <TodoWrapper
            header="In Progress"
            status={"in-progress"}
            todos={todos}
            refetch={refetch}
          />
        </Col>
        <Col md={8} sm={24}>
          <TodoWrapper
            header="Done"
            status={"done"}
            todos={todos}
            refetch={refetch}
          />
        </Col>
      </Row>
      {showAddTask && (
        <Modal
          title="Add Task"
          visible={showAddTask}
          onCancel={() => setShowAddTask(false)}
          footer={[]}
        >
          <Form layout="vertical" onFinish={(values) => handleAddTodo(values)}>
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
            <Space>
              <Button key="back" onClick={() => setShowAddTask(false)}>
                Close
              </Button>

              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Space>
          </Form>
        </Modal>
      )}
    </div>
  )
}
