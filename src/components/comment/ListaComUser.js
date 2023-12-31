import ER from './icons/e_rojo.png'
import EB from './icons/e_blanco.png'

export function ListaComUser({comments = []}) {
    const { content = [] } = comments

    return <div className="">
        {content.length === 0 ? <h1>El usuario no ha publicado comentarios</h1> :
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
                <span className="">{comment.film.title}</span>
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