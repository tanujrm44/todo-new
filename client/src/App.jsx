import { Outlet } from "react-router-dom"
import { ConfigProvider } from "antd"
import { MessageProvider } from "./context/MessageContext"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3173F5",
          borderRadius: 5,
        },
        Layout: {
          bodyBg: "#e25303",
        },
        components: {
          Table: {
            cellPaddingBlock: 2,
            fontSize: 12,
          },
        },
      }}
    >
      <MessageProvider>
        <div className="main-container">
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </MessageProvider>
    </ConfigProvider>
  )
}
