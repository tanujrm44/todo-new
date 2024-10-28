import React, { useState } from "react"
import { Form, Input, Button, Spin } from "antd"
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../slices/api/authApiSlice"
import { useMessage } from "../context/MessageContext"
import { useDispatch } from "react-redux"
import { setCredentials } from "../slices/userSlice"
import { BACKEND_URL } from "../constants"

const RegisterPage = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { showMessage } = useMessage()
  const [register, { isLoading }] = useRegisterMutation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  })

  // useEffect(() => {
  //   if (localStorage.getItem("auth")) {
  //     navigate("/")
  //   }
  // }, [])

  const onFinish = async (values) => {
    setFormData(values)
    if (values.password !== values.confirm_password) {
      return showMessage("Passwords do not match", "error")
    }
    try {
      const res = await register(values).unwrap()
      dispatch(setCredentials({ ...res }))
      showMessage("Register successful!", "success")
      navigate("/")
    } catch (err) {
      console.log(err)
      showMessage(err?.data?.message, "error")
    }
  }

  const handleGoogleAuth = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/google/callback`
    } catch (err) {
      showMessage("Something went wrong", "error")
    }
  }

  return (
    <div className="loginContainer">
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Sign Up</h3>
      <Form onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        >
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Sign Up
          </Button>
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            Already have an account?{" "}
            <span className="register-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
          <Button
            icon={<GoogleOutlined />}
            className={"google-btn"}
            onClick={handleGoogleAuth}
          >
            {" "}
            Sign Up with Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterPage
