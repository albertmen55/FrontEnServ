import {Shell, TODO, Separator, Link, Logo, Input, Button} from '../../components'
import {useState} from 'react'
import {AuthenticationContext} from "../../context";
import {useContext} from "react";
import { useUser, useFriend } from '../../hooks'
import {
    AtSymbolOutline,
    CalendarOutline as Calendar,
    LocationMarkerOutline as Point,
    UserOutline,
    XOutline
} from "@graywolfai/react-heroicons";
import {Redirect, useHistory} from "react-router-dom";

const backdrop = pic=> {
    const picture = pic === 'none' ? "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" : pic

    return picture
}

export default function Friends() {
    const { logout } = useContext(AuthenticationContext)
    const user = useUser().user

    return <Shell>
        <img style = {{ height: '28rem' }}
             src = { backdrop(user.picture) }
             alt = { `${user.name} backdrop` }
             className = 'absolute top-2 left-0 right-0 w-full object-cover filter blur transform scale-105' />

        <div className = 'mx-auto w-full max-w-screen-2xl p-8'>
            <Header user = { user } />
            <Requests user = { user } />
            <FriendList user = { user } />
            <div className="mt-20">
            </div>
        </div>
    </Shell>
}

function Header({ user}) {
    return <header className = 'mt-64 relative flex items-end pb-8 mb-8'>
        <img style = {{ height: "250px" }}
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

function Requests({ user }) {
    const { addF } = useUser(user.email)
    const history = useHistory()
    const [ errors, setErrors ] = useState(false)
    const reset = () => {
        setErrors(false)
    }

    const submit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        try {
            if ( data.get('email')) {
                const response = await addF({
                    email: data.get('email'),
                    name: data.get('name'),
                });

                window.location.reload();

                if (response && response.ok) {
                    history.push('/');
                } else {
                    setErrors(true);
                }
            }
        } catch (err) {
            setErrors(true);
        }
    };



    return <div>
        <h1 className="text-2xl font-bold mb-4">Añadir amigos</h1>
        <Separator/>
        <form className = 'bg-white rounded shadow p-8 flex flex-col text-teal-900'
              onSubmit = { submit }>
            <Input type = 'email'
                   name = 'email'
                   label = 'Email'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { AtSymbolOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'name'
                   label = 'Nombre'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { UserOutline }
                   variant = 'primary'
            />
            <Button className = 'mt-8' type = 'submit' variant = 'secondary'>Añadir amigo</Button>
        </form>
    </div>
}

function FriendList({ user }) {
    const { removeF } = useUser(user.email)
    const history = useHistory()
    const [ errors, setErrors ] = useState(false)
    const reset = () => {
        setErrors(false)
    }

    const submit = async (email) => {

        try {
            const response = await removeF(email);
            window.location.reload();

            if (response && response.ok) {
                history.push('/');
            } else {
                setErrors(true);
            }
        } catch (err) {
            setErrors(true);
        }
    };



    if (!user || !user.friends) {
        return <div className="mt-10">
            <h1 className="text-2xl font-bold mb-4">Amigos</h1>
            <Separator/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p>El usuario aún no tiene amigos</p>
            </div>
        </div>
    }
    return <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">Amigos</h1>
        <Separator/>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.friends.map((friend, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{friend.name}</h3>
                        <p className="text-sm text-gray-500">{friend.email}</p>
                    </div>
                    <XOutline
                        className="h-10 w-10 mx-4 text-black-500 cursor-pointer"
                        onClick={() => submit(friend.email)}
                    />
                </div>

            ))}
        </div>
    </div>
}
