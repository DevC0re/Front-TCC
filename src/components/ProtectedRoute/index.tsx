import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../../style/utils/utils";

export function ProtectRoute() {


    const token = localStorage.getItem("token")

    if (!token|| !isTokenValid(token)) {
        
        localStorage.removeItem("token")

        
        return <Navigate to="/" replace />
    }

    return <Outlet/>


}