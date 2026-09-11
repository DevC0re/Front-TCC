import { Search } from "lucide-react";
import { Input } from "../../components/Input";
import s from "./Home.module.scss";


export function Homepage() {

    return (
        <>
            <div className={s.content}>
                
               <aside className={s.asSide}>
                <img src="" alt="Logo" />

                <div className={s.navLinks}>
                <img src="" alt="Logo" />
                <img src="" alt="Logo" />
                <img src="" alt="Logo" />
                </div>
                
               </aside>

            <main className={s.main}>

                <div className={s.searchBar}>
                    <Input className={s.searchInput}
                    type="text"
                    id="search"
                    placeholder="Busque Hospitais"
                    variant="search"   
                    />
                </div>

                <div className={s.box}>
                    <div className={s.text}>

                    <h1>Bem vindo, nome</h1>
                    <p>Encontre os melhores serviços da sua região</p>
                    
                    </div>

                    <div className={s.carousel}>

                        <img src="" alt="hospitais" />
                        <img src="" alt="hospitais" />
                        <img src="" alt="hospitais" />
                    
                    
                    </div>

                </div>

                <div className={s.box}>
                    <div className={s.text}>

                    <h1>Mais proximos á você </h1>
                    <p>Serviços de saúde pertinho de você</p>
                    </div>

                    <div className={s.carousel}>
                        <img src="" alt="Hospitais proximos" />
                        <img src="" alt="hospitais" />
                        <img src="" alt="hospitais" />
                    
                    </div>
                </div>

            
            </main>
 </div>
        </>
    )

}