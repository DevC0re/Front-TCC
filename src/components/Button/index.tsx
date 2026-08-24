import "./styles.scss";
import { Children } from "react";

interface ButtonProps{


    children: React.ReactNode;
    type?: "submit"| "button";

} 


export function Button({ children, type ="submit" } : ButtonProps){
    return(
        <button className ="button" type={type}>

            {children}
            
        </button>

    )
}