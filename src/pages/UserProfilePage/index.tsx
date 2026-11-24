import s from "./UserProfilePage.module.scss";
import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import { useState,  type FormEvent } from "react";
import { Button } from "../../components/Button";

export function UserProfilePage() {

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

const [fdata, setFData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
    const [eData, setEData] = useState<RegisterFormError>({
  
  
    })

    return (
         

        <>
            <div className={s.body}>

                <Navbar />
                <div className={s.main}>
                    <h1>Perfil de usuario</h1>
                    <p>Gerencie suas informações pessoais, endereços e plano de saúde</p>

                    <div className={s.userCard}>
                        <img src="" alt="Foto do Usuario" />

                        <div className={s.userInfos}>
                            <h1>Joaozinho</h1>
                            <p>Joao@gmail.com</p>

                        </div>
                        <Button children="Editar perfil"/>
                    </div>

                    <div className={s.editInfo}>

                    <h1>Editar informações pessoais</h1>
                    <p>Altere seus dados e salve quando terminar.</p>

                    <div className={s.inputWrapper}>

                    <Input type="text"
                    id="name"
                    placeholder="Nome completo"

                    />

                    <Input type="email"
                    id="email"
                    placeholder="E-mail"
                    />

                    <Input type="phone"
                    id="phone"
                    placeholder="Telefone"
                    />
  
                    <Input type="text"
                    id="date"
                    placeholder="Data de nascimento"
                    />
                    
                    <Button 
                    children="Salvar alterações"
                    type="submit"
                    />
                    
                    <Button 
                    children="Cancelar"
                    type="submit"
                    />

                    </div>
                    
                    </div>

                    <div className={s.adressInfo}>
                        <h1>Endereço</h1>
                      
                    <div className={s.inputWrapper}>
                    <Input type="text"
                    id="road"
                    placeholder="Rua"
                    
                    />
                    <Input type="text"
                    id="neighborhood"
                    placeholder="Bairro"
                    
                    />
                    <Input type="text"
                    id="cep"
                    placeholder="Cep"
                    
                    />
                    <Input type="text"
                    id="number"
                    placeholder="Numero"
                    
                    />
                    <Input type="text"
                    id="city"
                    placeholder="Cidade"
                    
                    />
                    <Input type="text"
                    id="state"
                    placeholder="Estado"
                    
                    />
                    </div>  

                    <Button 
                    children = "Editar Endereço"
                    type="submit"
                    />

                    </div>

                    <div className={s.agreementInfo}>
                        <div className={s.texts}>

                    <h1>Convênio</h1>
                    <p>Plano de saúde vinculado para atendimentos rápidos nos hospitais credenciados.</p>
                        </div>
                     <img src="" alt="Foto convênio" />

                     <div className={s.texts}>
                        <p>NOME DO CONVÊNIO</p>
                        <h1>Amil Saúde</h1>
                        <p>Plano Nacional Conforto</p>
                        <p>Hospitais credenciados:</p>
                        
                        </div>   

                    </div>


                </div>
            </div>

        </>
    )
}