import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { ProtectRoute } from "./components/ProtectedRoute"
import { HospitalProfilePage } from "./pages/HospitalProfilePage";
import { RegisterPage } from "./pages/SignInPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { VerifyCodePage } from "./pages/PasswordRecovery/VerifyCodePage";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/Signup" element={<RegisterPage />} />

          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectRoute />}>
            <Route path="/home" element={<HomePage />} />

            <Route
              path="/hospital/:id"
              element={<HospitalProfilePage />}
            />
          </Route>

            <Route
              path="/VerifyAccount"
              element={<VerifyCodePage />}
            />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
