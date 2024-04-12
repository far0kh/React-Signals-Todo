import Header from "./Header"
import Sidebar from "./Sidebar"
import Todos from "./Todos"

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Todos />
      </div>
    </>
  )
}

export default App
