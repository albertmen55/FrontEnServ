import { useUser } from "../../hooks"

const picture = user => {
    if(user.content){
        const picture = user.content[0]?.picture === 'none' ? "https://media.istockphoto.com/id/517998264/es/vector/hombre-icono-de-usuario.jpg?s=612x612&w=is&k=20&c=qX2mEhSna0SxcxMXXyS8YZRaYBm8itZ9N9Ma1S4Bug4=" : user.content[0].picture

        return picture
    }else{
        return null
    }
}

export function ListaComFilm({comments = [], movie}) {
    return <div className="overflow-x-scroll">
        {comments.length === 0 ? (<span>No hay comentarios para esta pelicula.</span>) :
            (<div className="min-w-min" /* style={{ width: "180rem" }} */>
                <div className = 'p-5 flex flex-nowrap  space-x-12'  style={{ height: '26rem' }} >
                    {
                        comments?.map((comment) =>
                            <Element key = { comment.id } comment = {comment} movie = { movie }/>
                        )
                    }
                </div>
            </div>)}
    </div>
}

function Element({comment, movie}) {
    const {user} = useUser(comment.user.email)
    return <>{movie?.id === undefined ? (<div></div>) :
        (<div className = 'h-full min-w-min flex flex-col space-y-2 p-5 border rounded-md' style = {{boxShadow: '3px 5px rgb(0 0 0 / 0.15)', width: "55rem"}}>
            <div className="flex justify-center items-center" >
                    {movie?.id === comment?.movie.id ? <img style = {{ height: "25px" }}
                                                          src = { picture(user) }
                                                          alt = { `${ user?.email } poster` }
                                                          className = 'rounded-full z-20' /> : null}
                    <div className="flex-1 font-bold ml-2">
                        <span className="">{user.email}</span>
                    </div>
                <div className="grow">
                    <span className="">Puntuación: {comment?.rating}</span>
                </div>
            </div>
            <div className="font-serif">{comment?.comment}</div>
        </div>)}</>
}