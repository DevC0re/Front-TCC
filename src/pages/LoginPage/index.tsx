import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import hospital from "../../assets/Hospital.jpg";
import s from "./LoginPage.module.scss";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface RegisterFormError {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function LoginPage() {
  return (
    <div className={s.registerContainer}>
      <div className={s.rightSection}>
        <img src={hospital} alt="" />
      </div>

      <div className={s.leftSection}>
        <h1 className={s.text}>Login</h1>
        <form className={s.form}>
          <div className={s.field}>
            <label htmlFor="name">Nome</label>
            <Input type="text" id="name" placeholder="Nome completo" />
          </div>
          <div className={s.field}>
            <label htmlFor="email">E-mail</label>
            <Input type="email" id="email" placeholder="Digite seu e-mail" />
          </div>
          <div className={s.field}>
            <label htmlFor="password">Senha</label>
            <Input id="password" placeholder="********" variant="password" />
          </div>
          <div className={s.field}>
            <label htmlFor="confirm-password">Confirmar senha</label>
            <Input
              id="confirm-password"
              placeholder="********"
              variant="password"
            />
          </div>
          <Button type="submit">Criar nova conta</Button>
        </form>

        <div className={s.loginTxt}>
          <p>
          <div className={s.terms}>
          <span>Você já tem uma conta? </span>
          <a href="">Faça o Login</a>
          </div>
          </p>
        </div>

        <div className={s.termsNotice}>
          <p>Ao continuar, você concorda com nossos</p>
          <p className={s.terms}>
            <a href="#">Termos de Serviço</a>
            <span> e </span>
            <a href="#">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
}
