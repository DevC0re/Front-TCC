import { Button } from "../../components/Button";
import Input from "../../components/Input";
export function RegisterPage(){


    return(
        <>
        <div className="Left-Section">

        <img src="" alt="" />

        <button className="back-button"></button>
        </div>

        <div className="Right-Section">
            <h1>Registro</h1>    
            <form>
                

                <label htmlFor="name">Nome</label>
                <Input 
                type="text"
                id="name"
                placeholder="Nome completo"
                />

                <label htmlFor="email">E-mail</label>
                <Input 
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                />


                <label htmlFor="password">Senha</label>
                <Input 
                type="password"
                id="password"
                placeholder="********"
                />


               <label htmlFor="confirm-password">Confirmar senha</label>
                <Input 
                type="password"
                id="confirm-password"
                placeholder="********"
                />

                <Button type="submit" >
                Criar nova conta
                </Button>    
            </form>

        </div>
        </>
    )
}