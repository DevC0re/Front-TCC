import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import hospital from "../../assets/Hospital.jpg";
import s from "./LoginPage.module.scss";
import google from "../../assets/googleIcon.svg"
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {login} from "../../service/authService"
import axios from "axios";

interface LoginForm {
  email: string;
  password:string;
}

interface LoginFormError{

  email?:string
  password?:string
}

export function LoginPage() {


  const [isLoading , setIsLoading] = useState(false);

  const [lForm, setLForm] = useState<LoginForm>({
    email :' ',
    password :' ',

  })

  const [eForm, setEForm] = useState<LoginFormError>({

  })

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleLogin = async (event: FormEvent) => {

    event.preventDefault();

    const userData = localStorage.getItem("user")

    if (!lForm.email || !lForm.password) {

      setError("Preencha todos os campos")
      return
    }


  
    try {
      setIsLoading(true)

      const response = await login({

        email: lForm.email,
        senha: lForm.password,
  
      })
      const token = response.data;
      localStorage.setItem("token", token);
      navigate("/home")

    } catch (error) {

  
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          
          setError("E-mail ou senhas incorretos")
        }

      }


    }finally{
      setIsLoading(false)
    }

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
              value={lForm.email}
              onChange={(event) => {
                setLForm((previous)=>({
                  ...previous,
                  email : event.target.value
                }))
                setError("")
              }}

            />
          </div>


          <div className={s.field}>

            <label htmlFor="password">Senha</label>

            <Input
              id="password"
              placeholder="********"
              variant="password"
              value={lForm.password}
              onChange={(event) => {
              setLForm((previous)=>({
                ...previous,
                password : event.target.value
              }))
              }
              }
              error={!!error}
            />

            <div className={s.forgotPass}>

              <a href="http://">Esqueceu sua senha?</a>
            </div>
          </div>

          {error && <p className={s.errorMensage}>{error}</p>}

          <Button type="submit" disabled= {isLoading}>
            {isLoading ?  "Conectando" : "Conecte-se"}
          </Button>

        </form >

        <div className={s.googleContainer}>
          <button className={s.loginGoogle}> <img src={google} alt="Logo do google" />Faça login com o google</button>
        </div>

        <div className={s.signInTxt}>
          
            <div className={s.terms}>
              <span>Você não tem uma conta? </span>
              <Link to="/signup">Clique aqui</Link>
            </div>
      
        </div>

      </div>
    </div>
  );
}
