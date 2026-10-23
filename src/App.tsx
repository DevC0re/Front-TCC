import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { ProtectRoute } from "./components/ProtectedRoute"
import { RegisterPage } from "./pages/SignInPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    
    <Route path="/Signup" element= {<RegisterPage/>}/>
    
    <Route path="/" element={<LoginPage/>}/>

    <Route element={<ProtectRoute/>}>
    <Route path="/home" element={<HomePage/>}/> 
  
    </Route>
    
    
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
