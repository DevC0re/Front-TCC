import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import hospital from "../../assets/Hospital.jpg";
import s from "./SignInPage.module.scss";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../service/userService";
import axios from "axios";

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

export function RegisterPage() {

  const navigate = useNavigate()

  const [isLoading, setIsloading] = useState(false)

  const [fdata, setFData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [eData, setEData] = useState<RegisterFormError>({


  })

  const handleSingIn = async (event: FormEvent) => {
    let hasError = false;
    event.preventDefault();


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fdata.name.trim()) {
      setEData((previous) => ({

        ...previous, name: "Nome é obrigatorio"
      }))

      hasError = true


    }

    if (!fdata.email.trim()) {
      setEData((previous) => ({
        ...previous, email: "E-mail é obrigatorio"
      }))

      hasError = true

    } else {
      if (!emailRegex.test(fdata.email)) {
        setEData((previous) => ({
          ...previous,
          email: "Esse e-mail não é válido"
          }))
      hasError = true

        }
    }


    if (!fdata.password.trim()) {
      setEData((previous) => ({
        ...previous, password: "Senha é obrigatoria"
      }))
      hasError = true

    } else {
      if (fdata.password.length < 8) {

        setEData((previous) => ({
          ...previous, password: "Sua senha precisa ter no minimo 8 caracteres"
        }))
      hasError = true

      }
    }

    if (!fdata.confirmPassword.trim()) {
      setEData((previous) => ({
        ...previous, confirmPassword: "Confirme sua senha"
      }))
      hasError = true

    }
    else {
      if (fdata.confirmPassword !== fdata.password) {
        setEData((previous) => ({
          ...previous,
          confirmPassword: "As senhas não coincidem"
        }))
        hasError = true

      }
    }
    if (hasError) {
      return;
  }
  try{
    setIsloading(true)

    await createUser({
      name :fdata.name,
      email:fdata.email,
      password:fdata.password

    })
    navigate("/")
  }
  catch(error){
    if(axios.isAxiosError(error)){

      if(error.response?.status===403){

        setEData((previous)=>({
          ...previous,
          email:"Já existe uma conta com esse e-mail"

          
          
        })
      )
      }
    }
    
    return console.error(error);
    
  }finally{
    setIsloading(false)
  }
  }

  return (
    <div className={s.registerContainer}>
      <div className={s.leftSection}>
        <img src={hospital} alt="" />
      </div>

      <div className={s.rightSection}>
        <h1 className={s.text}>Registro</h1>
        <form onSubmit={handleSingIn} className={s.form}>
          <div className={s.field}>
            <label htmlFor="name">Nome</label>
          
            <Input
              type="text"
              id="name"
              placeholder="Nome completo"
              value={fdata.name}
              error={!!eData.name}
              onChange={(event) => {
                setFData((previous) => ({
                  ...previous,
                  name: event.target.value
                }))
                
                setEData((previous) => ({
                  ...previous,
                  name: ""
                }))
               
              }}

            />
              {eData.name&& <span className={s.errorMensage}>{eData.name} </span>}

          </div>
          <div className={s.field}>
            <label htmlFor="email">E-mail</label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={fdata.email}
              error={!!eData.email}
              onChange={(event) => {
                setFData((previous) => (
                  { ...previous, email: event.target.value }
                )
                )
                setEData((previous) => ({
                  ...previous,
                  email: ""
                }))
              }
            }
              />
              
              {eData.email&& <span className={s.errorMensage}>{eData.email} </span>}

          </div>

          <div className={s.field}>
            <label htmlFor="password">Senha</label>
            <Input
              id="password"
              placeholder="********"
              variant="password"
              value={fdata.password}
              error={!!eData.password}
              onChange={(event) => {
                setFData((previous) => (
                  { ...previous, password: event.target.value }
                )
                )
                setEData((previous) => ({
                  ...previous,
                  password: ""
                }))
              }
              }
            />
              {eData.password&& <span className={s.errorMensage}>{eData.password} </span>}

          </div>

          <div className={s.field}>
            <label htmlFor="confirm-password">Confirmar senha</label>
            <Input
              id="confirm-password"
              placeholder="********"
              variant="password"
              value={fdata.confirmPassword}
              error={!!eData.confirmPassword}
              onChange={(event) => {
                setFData((previous) => (
                  { ...previous, confirmPassword: event.target.value }
                )
                )
                setEData((previous) => ({
                  ...previous,
                  confirmPassword: ""
                }))
              }
              }

            />
              {eData.confirmPassword&& <span className={s.errorMensage}>{eData.confirmPassword} </span>}

          </div>
          <Button 
          type="submit" 
          disabled={isLoading}>
            {isLoading ? "Criando conta...": "Criar nova conta"}
            </Button>
        </form>

        <div className={s.loginTxt}>
          
            <div className={s.terms}>
              <span>Você já tem uma conta? </span>
              <Link to="/">Faça o Login</Link>
            </div>
          
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