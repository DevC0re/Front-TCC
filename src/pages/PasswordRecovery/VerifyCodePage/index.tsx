import { Button } from "../../../components/Button"
import { Input } from "../../../components/Input"
import s from "./VerifyCodePage.module.scss"

export function VerifyCodePage() {

    return (
        <div className={s.body}>
            <div className={s.content}>
                <div className={s.texts}>
                    <h1>Verifique a conta</h1>
                    <p> O codigo foi enviado para johndoe@gmail.com Digite o codigo para verificar sua conta.</p>
                </div>
                <div className={s.form}>
            
                   

                    <label htmlFor="">Senha</label>
                    <Input className={s.input} placeholder="*********" variant="password"/>
                    <label htmlFor="">Confirme sua senha</label>
                    <Input className={s.input} placeholder="*********" variant="password"/>
                    
                   
            
                </div>
                
                <div className={s.button}>
                    <Button
                        children="Verifique a conta"
                    />
                </div>

            </div>


        </div>
    )
}