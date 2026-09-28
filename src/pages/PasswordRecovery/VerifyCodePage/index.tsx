import { Button } from "../../../components/Button"
import { Input } from "../../../components/Input"
import s from "./VerifyCodePage.module.scss"

export function VerifyCodePage(){

    return(

        <div className={s.body}>
            <div className={s.content}>
                <div className={s.texts}>
                <h1>Verifique a conta</h1>
                <p> O codigo foi enviado para johndoe@gmail.com Digite o codigo para verificar sua conta.</p>
                </div>
                <div className={s.form}>
                <label htmlFor="">Insira o código</label>
                <Input/>
                </div>
            </div>
            <div className={s.code}>
            <p>Não recebeu o código? </p> <a href="">Reenviar código</a>
            <p>Reenviar código em 00:59</p>
            </div>
            <div className={s.button}>
            <Button
            children="Verifique a conta"
            />
            </div>

        </div>
    )
}