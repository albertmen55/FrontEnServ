import { Shell, TODO } from '../../components'
import {useComments, useMovie, useUser} from "../../hooks";
import {AuthenticationContext} from "../../context";
import {useContext} from "react";


export default function Profile() {
    const { logout } = useContext(AuthenticationContext)
    const { user: { name = '', email = '', picture = '',
        country='', birthday = {}  } } = useUser()
    const { day = '', month = '', year = '' } = birthday;

    return <Shell className = 'p-4'>
        <div className="mx-auto w-full max-w-screen-2xl p-8">
            {/* Primera fila */}
            <div className="flex items-start">
                <div className="md:ml-4 mt-4 md:mt-0 w-full md:w-9/10">
                    <h1 className={`bg-black bg-opacity-25 backdrop-filter backdrop-blur 
        text-white text-6xl font-bold p-2 text-right w-full relative`}>
                        {name}
                    </h1>
                </div>
                <img
                    className="h-60 w-60 rounded-full shadow absolute top-0 left-10"
                    alt="profile icon"
                    src={picture}
                />
            </div>

            {/* Segunda fila */}
            <div className="mt-4 grid grid-cols-5 gap-4">
                <div className="col-start-3">
                    <h2 className="text-lg font-semibold">{day}/{month}/{year}</h2>
                </div>
                <div className="col-start-4">
                    <h2 className="text-lg font-semibold">{country}</h2>
                </div>
                <div className="col-start-5">
                    <h2 className="text-lg font-semibold">{email}</h2>
                </div>
            </div>

            {/* Comentarios */}
            <div className="mt-20">
                <Comments user={email} />
            </div>
        </div>

    </Shell>
}

function Comments({ user }) {
    //const { comments, createComment } = useComments({ filter: { movie : movie.id } } )

    return <div className = 'mt-16'>
        <TODO>Añadir lista de comentarios</TODO>
    </div>
}
