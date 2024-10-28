import React from "react"

import { Button, Form, Row } from "antd"
import TextInput from "../components/inputs/TextInput"
import SaveCancelButtons from "../components/SaveCancelButtons"
import { useAuth } from "../context/UserContext"
import SelectInput from "../components/inputs/SelectInput"
import { useMessage } from "../context/MessageContext"
import { useChangePasswordMutation } from "../slices/api/authApiSlice"

export default function ProfilePage() {
  const { localAuth } = useAuth()
  const { showMessage } = useMessage()
  const [profileForm] = Form.useForm()
  const [changePassword] = useChangePasswordMutation()

  const onFinish = async (values) => {
    if (values.password !== values.confirm_password) {
      return showMessage("Passwords do not match", "error")
    }

    if (values.password?.length < 6) {
      return showMessage("Password must be at least 6 characters", "error")
    }

    console.log(values)
    if (values.password) {
      try {
        await changePassword({
          password: values.password,
          password_confirmation: values.confirm_password,
        }).unwrap()
      } catch (err) {
        showMessage(err?.data?.errors || "Could not perform operation", "error")
      }
    }
    localStorage.setItem("rowsPerPage", values.rowsPerPage || 100)
    showMessage("Profile updated successfully", "success")
  }

  return (
    <div className="container">
      <h1 className="heading">Profile</h1>
      <Button onClick={() => window.history.back()}>Back</Button>

      <Form
        onFinish={onFinish}
        form={profileForm}
        initialValues={{
          ...localAuth,
          rowsPerPage: localStorage.getItem("rowsPerPage"),
        }}
        scrollToFirstError
        style={{ marginTop: "1rem" }}
      >
        <h4
          style={{
            marginBottom: "1rem",
          }}
        >
          Change Password
        </h4>
        <Row>
          <TextInput label="Name" name="name" disabled />
        </Row>
        <Row>
          <TextInput label="Password" name="password" type="password" />
        </Row>
        <Row>
          <TextInput
            label="Confirm Password"
            name="confirm_password"
            type="password"
          />
        </Row>
        <h4
          style={{
            marginBottom: "1rem",
          }}
        >
          Preferences
        </h4>
        <Row>
          <SelectInput
            label="Rows per page"
            name="rowsPerPage"
            options={[
              { value: 10, label: "10" },
              { value: 25, label: "25" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
              { value: 150, label: "150" },
              { value: 200, label: "200" },
            ]}
          />
        </Row>
        <SaveCancelButtons />
      </Form>
    </div>
  )
}
