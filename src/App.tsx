import { UserProfilePage } from "./pages/UserProfilePage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectRoute } from "./components/ProtectedRoute";
import { HospitalProfilePage } from "./pages/HospitalProfilePage";
import { RegisterPage } from "./pages/SignInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AgreementsPage } from "./pages/AgreementsPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Signup" element={<RegisterPage />} />

          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<UserProfilePage />} />

            <Route path="/hospital/:id" element={<HospitalProfilePage />} />
            <Route path="/convenio/:name" element={<AgreementsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
