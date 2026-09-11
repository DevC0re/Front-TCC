import type { InputHTMLAttributes } from "react";
import { useState, } from "react";
import {Eye, EyeOff, Search} from "lucide-react";
import s from "./input.module.scss";

interface InputProps extends InputHTMLAttributes <HTMLInputElement> {

    variant?:"default" |"password"|"search"
    type?:"email"|"text"|"password"
    error?: boolean
} 


export function Input({ type, id , placeholder, variant= "default",error, ...rest }: InputProps ){
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    
    const resolvedType = 
    variant==="password"
    ?isPasswordVisible
    ?"text"
    :"password"
    :type;


    return(
        <div className={s.inputWrapper}>
        {variant ==="search" && <Search className={s.search}/>} 
        <input 
        className={`${s.input} ${error ? s.inputError:""}`}
        type = {resolvedType}
        id = {id}
        placeholder = {placeholder}
        {...rest}
        
        /> 
        
        {variant === "password" && (
            <button
                type="button"
                className={s.togglePassword}
                onClick={()=> setIsPasswordVisible((prev)=>!prev)}
                aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}>

                    {isPasswordVisible ? <EyeOff /> : <Eye/>}
                </button>

        )}

        
        
        </div>
    );
}