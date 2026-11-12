import s from "./button.module.scss";

interface ButtonProps{


    children: React.ReactNode;
    type?: "submit"| "button";
    disabled?: boolean;
    onClick?:()=>void;

} 


export function Button({ children, type ="submit" } : ButtonProps){
    return(
        <button className ={s.button} type={type}>

            {children}
            
        </button>

    )
}