import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import hospital from "../../assets/Hospital.jpg";
import s from "./SignInPage.module.scss"

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  "confirmPassword": string;
}
interface RegisterFormError {
  name?: string;
  email?: string;
  password?: string;
  "confirmPassword"?: string;
}

export function RegisterPage() {
  return (
    <div className={s.registerContainer}>
      <div className={s.leftSection}>
        <img src={hospital} alt="" />
      </div>

      <div className={s.rightSection}>
        <h1>Registro</h1>
        <form>
          <label htmlFor="name">Nome</label>
          <Input type="text" id="name" placeholder="Nome completo" />

          <label htmlFor="email">E-mail</label>
          <Input type="email" id="email" placeholder="Digite seu e-mail" />

          <label htmlFor="password">Senha</label>
          <Input
            id="password"
            placeholder="********"
            variant="password"
          />

          <label htmlFor="confirm-password">Confirmar senha</label>
          <Input
            id="confirm-password"
            placeholder="********"
            variant="password"
          />

          <Button type="submit">Criar nova conta</Button>
        </form>
      </div>
    </div>
  );
}
