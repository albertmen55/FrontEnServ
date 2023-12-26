import { Shell, TODO, Separator } from '../../components'
import {useComments, useMovie, useUser} from "../../hooks";
import {AuthenticationContext} from "../../context";
import {useContext} from "react";
import {ListaComentsUser } from '../../components/comment'

const backdrop = pic=> {
    const picture = pic === 'none' ? "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" : pic

    return picture
}

export default function Profile() {
    const { logout } = useContext(AuthenticationContext)
    const { user: { name = '', email = '', picture = '',
        country='', birthday = {}  } } = useUser()
    const { day = '', month = '', year = '' } = birthday;

    return <Shell className = 'p-4'>
        {picture ? (
            <img
                style={{ height: '25vh', zIndex: -1 }}  // Establece un índice de capa inferior para el backdrop
                src={backdrop(picture)}
                alt={`${name} backdrop`}
                className='absolute top-0 left-0 right-0 w-full object-cover filter blur transform scale-85'
            />
        ) : null}

        <div className="mx-auto w-full max-w-screen-2xl p-8">
            {/* Resto del contenido */}
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
                    src={picture || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"}
                />
            </div>

            {/* Segunda fila */}
            <div className="mt-10 grid grid-cols-5 gap-4 relative" style={{ zIndex: 1 }}>  {/* Establece un índice de capa superior para el texto */}
                <div className="col-start-3">
                    <h2 className="text-lg font-semibold mb-2 text-black">{day}/{month}/{year}</h2>
                </div>
                <div className="col-start-4">
                    <h2 className="text-lg font-semibold mb-2 text-black">{country}</h2>
                </div>
                <div className="col-start-5">
                    <h2 className="text-lg font-semibold mb-2 text-black">{email}</h2>
                </div>
            </div>

            {/* Comentarios */}
            <div className="mt-20">
                <Comments user = { email } />
            </div>
        </div>
    </Shell>
}

function Comments({ user }) {
    const { comments} = useComments({ filter: { user : user } } )


    return <div className='mt-12 relative flex flex-col pb-8 mb-8'>
        <h2 className = 'mt-16 font-bold text-2xl'>Comentarios</h2>
        <Separator />
        <ListaComentsUser comments = {comments} />
    </div>
}