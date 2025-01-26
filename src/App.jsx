import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/homepage"
import AdminPage from "./pages/admin/adminPage"

function App() {

  return (
    <BrowserRouter>
    <Routes path="/*">
    <Route path="/admin/*" element={<AdminPage/>}/>
      <Route path="/*" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
