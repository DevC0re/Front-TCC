import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectRouteProps {

    children: ReactNode
}

export function ProtectRoute({ children }: ProtectRouteProps) {


    const sign = localStorage.getItem("isLoggedIn")

    if (sign !== "true") {
        return <Navigate to={"/"} />

    }

    return children


}