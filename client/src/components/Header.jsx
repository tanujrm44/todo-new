import { Link, useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../slices/api/authApiSlice"
import { useMessage } from "../context/MessageContext"
import { Button, Dropdown, Flex, Space } from "antd"
import { DownOutlined, UserOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../slices/userSlice"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.user)

  const { showMessage } = useMessage()
  const [logoutApi] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap()
      dispatch(logout())
      navigate("/login")
      showMessage("Logged out successfully", "success")
    } catch (error) {
      showMessage("Something went wrong", "error")
    }
  }
  const items = [
    {
      key: "1",
      label: <p onClick={logoutHandler}>Logout</p>,
      danger: true,
    },
  ]
  return (
    <nav style={{ padding: "1rem 2rem" }} className="bgPrimColor">
      <div className="flexContainer">
        <div className="flexContainer">
          <Link to="/" className="navLink">
            Todo App
          </Link>
        </div>
        {userInfo?.name ? (
          <div className="flexContainer cursor-pointer">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Flex>
                <p className="userText">
                  <UserOutlined />
                  {userInfo?.name.split(" ")[0]}
                </p>
                <DownOutlined style={{ color: "white" }} />
              </Flex>
            </Dropdown>
          </div>
        ) : (
          <Space>
            <Button onClick={() => navigate("/login")}>Login </Button>
            <Button type="primary" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </Space>
        )}
      </div>
    </nav>
  )
}

export default Header
