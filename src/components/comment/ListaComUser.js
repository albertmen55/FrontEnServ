
export function ListaComentsUser({comments = []}) {
    const { content = [] } = comments

    return <div className="">
        {content.length === 0 ? <h1>El usuario no ha publicado comentarios todavía</h1> :
            <div className="min-w-min" /* style={{ width: "180rem" }} */>
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

    return <div className = 'min-w-min flex flex-col space-y-8 p-5 border rounded-md' style = {{boxShadow: '3px 5px rgb(0 0 0 / 0.15)'}}>
        <div className="flex justify-center" >
            <div className="flex-1 font-bold">
                <span className="">{comment.film.title}</span>
            </div>
            <div className="puntucacion">
                <div className="flex" style={{ height: '25px' }}>
                    {comment.rating}/10
                </div>
            </div>
        </div>
        <div className="font-serif">{comment.comment}</div>
    </div>
}