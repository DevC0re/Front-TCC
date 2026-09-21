import s from "./ComingSoon.module.scss"

interface ModalCondition{

    isOpen : boolean
    onClose: ()=> void;
}

export function ComingSoon({isOpen, onClose} : ModalCondition){

    if(!isOpen){
        return null
    }
    return(

        <div className={s.overlay}>
            <div 
            className={s.modal}>
                <h2>Em breve!</h2>

                <p>Essa funcionalidade ainda está em desnvolvimento.</p>

                <button onClick={onClose}>OK</button>
            </div>

        </div>
    )
}