import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import hospital from "../../assets/Hospital.jpg";
import s from 
"./LoginPage.module.scss";

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
            <label htmlFor="email">E-mail</label>
            <Input type="email" id="email" placeholder="Digite seu e-mail" />
          </div>
          <div className={s.field}>
            <label htmlFor="password">Senha</label>
            <Input id="password" placeholder="********" variant="password" />
            <div className={s.terms}>
             <a href="http://">Esqueceu sua senha?</a></div>
          </div>
         
          <Button type="submit">Conecte-se</Button>
        </form>

      </div>
    </div>
  );
}
