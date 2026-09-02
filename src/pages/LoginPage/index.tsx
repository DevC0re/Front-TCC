import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import hospital from "../../assets/Hospital.jpg";
import s from "./LoginPage.module.scss";
import google from"../../assets/googleIcon.svg"
import { useState } from "react";
import type { ReactFormState } from "react-dom/client";
import type { FormEvent } from "react";

const userMock = {
  email:"test@gmail.com",
  password :"123456"
}


export function LoginPage() {

      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [error, setError] = useState("")
      
      const handleLogin = (event : FormEvent) =>{

        event.preventDefault();
        if (!email || !password) {
          
          setError("Preencha todos os campos")
          return
        }
        if (email !== userMock.email || password !== userMock.password) {
          setError("Email ou senha incorretos. Por favor, verifique")
          return
          
        }
        localStorage.setItem("isLoggedIn", "true")
        
      }


  return (
    <div className={s.registerContainer}>
      <div className={s.rightSection}>
        <img src={hospital} alt="" />
      </div>

      <div className={s.leftSection}>
        <h1 className={s.text}>Login</h1>
        <form onSubmit={handleLogin} className={s.form}>
         
          <div className={s.field}>
            <label htmlFor="email">E-mail</label>
            
            <Input 
            type="email" 
            id="email" 
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event)=> {
              setEmail(event.target.value) 
            setError("")
            }}
           
              error={!!error}
            />
          </div>


          <div className={s.field}>
           
            <label htmlFor="password">Senha</label>
            
            <Input 
            id="password" 
            placeholder="********" 
            variant="password" 
            value={password}
            onChange={(event)=> 
            {setPassword(event.target.value)
            setError("")
            }
          }
            error={!!error}
            />
            
            <div className={s.forgotPass}>
            
             <a href="http://">Esqueceu sua senha?</a></div>
          </div>
         
          {error && <p className={s.errorMensage}>{error}</p>}

          <Button type="submit">Conecte-se</Button>
        
        </form >
        
          <div className={s.googleContainer}>
        <button className={s.loginGoogle}> <img src={google} alt="Logo do google"/>Faça login com o google</button>
          </div>

        <div className={s.signInTxt}>
          <p>
          <div className={s.terms}>
          <span>Você não tem uma conta? </span>
          <a href="">Clique aqui</a>
          </div>
          </p>
        </div>

      </div>
    </div>
  );
}
