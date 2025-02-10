import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/homepage"
import AdminPage from "./pages/admin/adminPage"
import LoginPage from "./pages/login/loginPage"

function App() {

  return (
    <BrowserRouter>
    <Routes path="/*">
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/admin/*" element={<AdminPage/>}/>
    <Route path="/*" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
