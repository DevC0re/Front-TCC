import s from "./button.module.scss";

interface ButtonProps{


    children: React.ReactNode;
    type?: "submit"| "button";

} 


export function Button({ children, type ="submit" } : ButtonProps){
    return(
        <button className ={s.button} type={type}>

            {children}
            
        </button>

    )
}