
interface Data {
    image: string;
    name: string;
    endereco: string;
    situacao: boolean;
    avaliacao: number;
    type: "SUS" | "Convênio";
    favorito: boolean;
}
export function HospitalCard({ image, name, endereco, situacao, avaliacao, type, favorito }: Data) {

    return (
        <div>

            <img src={image} alt="" />

            <div className="Favorite">

                <h1>{name}</h1>

            </div>

            <div>
                <h1>{endereco}</h1>
            </div>

            <div>

                <div>
                    <p></p>
                </div>

                <div>
                    <p></p>
                </div>

                <div>
                    <p></p>
                </div>

            </div>
        </div>
    )
}