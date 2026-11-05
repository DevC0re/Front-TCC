import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { ProtectRoute } from "./components/ProtectedRoute"
import { HospitalProfilePage } from "./pages/HospitalProfilePage";
import { RegisterPage } from "./pages/SignInPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    
    <Route path="/Signup" element= {<RegisterPage/>}/>
    
    <Route path="/" element={<HospitalProfilePage/>}/>

    <Route element={<ProtectRoute/>}>
    <Route path="/home" element={<HomePage/>}/> 
  
    </Route>
    
    
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
