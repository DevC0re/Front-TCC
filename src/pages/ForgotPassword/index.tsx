import s from "./forgotPassword.module.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
export function ForgotPassword() {
  return (
    <div className={s.body}>
      <div className={s.content}>
        <div className={s.box}>
          <div className={s.texts}>
            <h1>"Esqueceu a senha"</h1>

            <p>
              "Sem problemas! Insira seu endereço de e-mail abaixo e enviaremos
              um codigo para redefinir sua senha"
            </p>
          </div>
          <div className={s.input}>
            <label htmlFor="email">E-mail</label>
            <Input className={s.form} placeholder="Enter your email" />
          </div>
        </div>
        <div className={s.button}>
          <Button children="Enviar instrução de redefinição" />
        </div>
      </div>
    </div>
  );
}
