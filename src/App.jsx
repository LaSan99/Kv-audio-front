import "./App.css";
import AdminPage from "./pages/admin/adminPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage.jsx";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";

function App() {
  return (
    <GoogleOAuthProvider clientId="1004979321065-csae0fqeivgon3ru3t5hl7k53snnlg2g.apps.googleusercontent.com">
			<BrowserRouter>
				<Toaster position="top-right" />
				<Routes path="/*">
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
          			<Route path="/verify-email" element={<VerifyEmail />} />
					<Route path="/admin/*" element={<AdminPage />} />
					<Route path="/*" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</GoogleOAuthProvider>
  );
}

export default App;
