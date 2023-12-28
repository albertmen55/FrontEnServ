import {Shell, TODO, Separator, Link} from '../../components'
import {useComments, useMovie, useUser} from "../../hooks";
import {AuthenticationContext} from "../../context";
import {useContext} from "react";
import {ListaComUser } from '../../components/comment'
import {
    CalendarOutline as Calendar,
    LocationMarkerOutline as Point
} from "@graywolfai/react-heroicons";

const backdrop = pic=> {
    const picture = pic === 'none' ? "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" : pic

    return picture
}

export default function EditProfile() {
    const { logout } = useContext(AuthenticationContext)
    const user = useUser().user

    return <Shell>
        <img style = {{ height: '36rem' }}
             src = { backdrop(user.picture) }
             alt = { `${user.name} backdrop` }
             className = 'absolute top-2 left-0 right-0 w-full object-cover filter blur transform scale-105' />

        <div className = 'mx-auto w-full max-w-screen-2xl p-8'>
            <Header user = { user } />
            <Comments user = { user } />
            <div className="mt-20">
            </div>
        </div>
    </Shell>
}

function Header({ user}) {
    return <header className = 'mt-64 relative flex items-end pb-8 mb-8'>
        <img style = {{ aspectRatio: '1/1' }}
             src = { user.picture || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" }
             alt = { `${ user.name } poster` }
             className = 'w-64 rounded-full shadow-xl z-20' />
        <hgroup className = 'flex-1'>
            <h1 className = {`bg-black bg-opacity-50 backdrop-filter backdrop-blur 
                                          text-right text-white text-6xl font-bold
                                          p-8`}>
                { user.name }
            </h1>
            <Info user = { user } />
        </hgroup>
    </header>
}

function Info({ user }) {

    return <div className='p-8 flex justify-center space-x-64'>
        <Birthday user = { user} />
        <Country user = { user} />
        <Email user = { user} />
    </div>
}

function Birthday ( {user}) {

    if (!user || !user.birthday) {
        return (
            <div>
                <p>Cargando...</p>
            </div>
        );
    }
    return <span className='flex'>
            <Calendar className = 'h-10 w-10 mx-4 text-black-500'/>
            <h1 className={`text-black text-4xl font-boldp-8`}> {user.birthday.day}/{user.birthday.month}/{user.birthday.year} </h1>
        </span>
}

function Country ( {user}) {
    return <span className='flex'>
            <Point className = 'h-10 w-10 mx-4 text-black-500'/>
            <h1 className={`text-black text-4xl font-boldp-8`}> {user.country}  </h1>
        </span>
}

function Email ( {user}) {
    return <span className='flex'>
            <h1 className={`text-black text-4xl font-boldp-8`}> {user.email}  </h1>
        </span>
}


function Comments({ user }) {

    return <div className='mt-12 relative flex flex-col pb-8 mb-8'>
        <div className="mt-20 text-center">
            <p>Para actualizar tu perfil simplemente coloca tu cursor encima de ella y
                modificala a tu antojo.</p>

            <p>No podrás modificar tu dirección de correo electrónico ni tu fecha de nacimiento.</p>
        </div>
    </div>
}