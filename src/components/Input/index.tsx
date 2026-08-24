import type { InputHTMLAttributes } from "react";
import { useState, } from "react";
import {Eye, EyeOff} from "lucide-react";
import s from "./input.module.scss";

interface InputProps extends InputHTMLAttributes <HTMLInputElement> {

    variant?:"default" |"password";
    type?:"email"|"text"|"password"
} 


export function Input({ type, id , placeholder, variant= "default", ...rest }: InputProps ){
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    
    const resolvedType = 
    variant==="password"
    ?isPasswordVisible
    ?"text"
    :"password"
    :type;


    return(
        <div className={s.inputWrapper}>
        <input 
        type = {resolvedType}
        id = {id}
        placeholder = {placeholder}
        {...rest}
        /> 
        
        {variant === "password" && (
            <button
                type="button"
                className="toggle-password"
                onClick={()=> setIsPasswordVisible((prev)=>!prev)}
                aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}>

                    {isPasswordVisible ? <EyeOff /> : <Eye/>}
                </button>

        )}
        
        </div>
    );
}