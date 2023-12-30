import { useUser } from "../../hooks"
import ER from "./icons/e_rojo.png";
import EB from "./icons/e_blanco.png";

const picture = user => {
    if(user.content){
        const picture = user.content[0]?.picture === 'none' ? "https://media.istockphoto.com/id/517998264/es/vector/hombre-icono-de-usuario.jpg?s=612x612&w=is&k=20&c=qX2mEhSna0SxcxMXXyS8YZRaYBm8itZ9N9Ma1S4Bug4=" : user.content[0].picture

        return picture
    }else{
        return null
    }
}

export function ListaComFilm({comments = []}) {
    const { content = [] } = comments

    return <div className="">
        {content.length === 0 ? <h1>No se han encontrado comentarios</h1> :
            <div className="min-w-min">
                <div className = 'p-5 flex flex-col space-y-16'  >
                    {
                        content?.map((comment, idx) =>
                            <Element key = { comment.id } comment = {comment} index = { idx } total = { content.length }/>
                        )
                    }
                </div>
            </div>}
    </div>
}

function Element({comment, className = '', active, index, total}) {
    const puntuacion = [1,2,3,4,5,6,7,8,9,10]

    return <div className = 'min-w-min flex flex-col space-y-8 p-5 border rounded-md' style = {{boxShadow: '3px 5px rgb(0 0 0 / 0.15)'}}>
        <div className="flex justify-center" >
            <div className="flex-1 font-bold">
                <span className="">{comment.user.email}</span>
            </div>
            <div className="puntuacion">
                <div className="flex" style={{ height: '25px' }}>
                    {puntuacion.map((estrella, idx) =>
                        <img src = {idx+1 <= comment.rating ? ER : EB}
                             id = {idx+1}
                             alt = { `estrella ${idx}` }
                             key = {idx}
                             style = {{ width: '25px' }}/>
                    )}
                </div>
            </div>
        </div>
        <div className="font-serif">{comment.comment}</div>
    </div>
}