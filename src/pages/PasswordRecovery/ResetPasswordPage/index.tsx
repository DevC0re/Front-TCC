import s from "./ResetPasswordPage.module.scss";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
export function ResetPassword() {
  return (
    <div className={s.body}>
      <div className={s.content}>
        <div className={s.box}>
          <div className={s.texts}>
            <h1>Verifique a conta</h1>

          <div className={s.instructionText}>
            <p>
              O código foi enviado para <span>johndoe@gmail.com </span>
              Digite o código para verificar sua conta.
            </p>
            </div>
          </div>
          <div className={s.input}>
            <label htmlFor="">Insira o código</label>
            <Input className={s.form} placeholder="Código de 4 dígitos" />
       
       
       
        <p className={s.receiveCode}>Não recebeu o código? <span className={s.reCode}>Reenviar código</span></p>
        <p className={s.receiveCode}>Reenviar código em 00:59</p>
        
          </div>
        </div>
        <div className={s.button}>
          <Button children="Enviar instrução de redefinição" />
        </div>
      </div>
    </div>
  );
}
