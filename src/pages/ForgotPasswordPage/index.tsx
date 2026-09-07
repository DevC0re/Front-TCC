import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import  s  from "./ForgotPasswordPage.module.scss";


export function ForgotPasswordPage() {
    
    return(
        <>
        <div className={s.content}>
        <form className={s.form}>

        <h1>Esqueceu sua senha</h1>
        
        <p className={s.text}>Sem problemas! Insira seu endereço de e-mail abaixo e enviaremos um codigo para redefinir sua senha</p>

        <div>
        <label htmlFor="email">E-mail</label>
        <Input
        type="email"
        id="email"
        placeholder="Digite um email"

        />        

        </div>

        <div>
        <Button
        type="submit"> Enviar instrução de redefinição</Button>

        </div>
        
        </form>
        </div>

        </>
    )
}
