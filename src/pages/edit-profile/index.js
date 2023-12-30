import { useState, useEffect } from 'react'

import { Shell, Link } from '../../components'

import {useUser } from '../../hooks'

import {
    CalendarOutline as Calendar,
    LocationMarkerOutline as Point,
    CheckCircleOutline as Check,
} from "@graywolfai/react-heroicons";

const backdrop = user => {
    const backdrop = user?.picture === 'none' ? "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" : user.picture

    return backdrop
}

export default function EditProfile() {
    const { update } = useUser()
    const user = useUser().user

    return <Shell>
        <img style = {{ height: '28rem' }}
             src = { backdrop(user) }
             alt = { `${user} backdrop` }
             className = 'absolute top-2 left-0 right-0 w-full object-cover filter blur transform scale-105' />

        <Link variant = 'primary'
              className = 'rounded-full absolute text-white top-4 right-8 flex items-center px-2 py-2 gap-4'
              to = {`/profile`}>
            <Check className = 'w-8 h-8'/>
            <h1>Terminar</h1>
        </Link>


        <div className = 'mx-auto max-w-screen-2xl p-8'>
            <Header user = { user } update = {update}/>
        </div>
    </Shell>
}

function Header({ user, update }) {
    const [userName, setUserName] = useState('')
    const [userLocation, setUserLocation] = useState('')
    const [userPicture, setUserPicture] = useState('')

    useEffect(() => {
        setUserName(user.name);
        setUserLocation(user.country)
        setUserPicture(user.picture)
    }, [user.name])

    const handleName = (e) => {
        if(userName === ""){
            setUserName(user.name)
        }else{
            let changes = [{
                op: "replace",
                path: "/name",
                value: userName
            }]
            console.log(changes)
            update(changes)
        }
    }

    const handleLocation = (e) => {
        if(userLocation === ""){
            setUserLocation(user.country)
        }else{
            let changes = [{
                op: "replace",
                path: "/country",
                value: userLocation
            }]
            update(changes)
        }
    }

    const handleUserPicture = (e) => {
        if(userPicture === ""){
            setUserPicture('none')
            let changes = [{
                op: "replace",
                path: "/picture",
                value: 'none'
            }]
            update(changes)
        }else{
            let changes = [{
                op: "replace",
                path: "/picture",
                value: userPicture
            }]
            update(changes)
        }
    }

    return <header className = 'mt-64 relative flex items-end pb-8 mb-8'>
        {user.length === 0 ?  null : <>
            <div className='flex flex-col'>
                <img style = {{ height: "250px" }}
                     src = { user.picture || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" }
                     alt = { `${ user.name } poster` }
                     className = 'w-64 rounded-full z-20' />
                <div className='flex items-center'>
                    <input className='mt-2 p-2 border' value={userPicture} onChange={(e) => setUserPicture(e.target.value)}></input>
                    <Check className = 'w-12 h-12 ml-2 mt-2 hover:bg-grey-700' onClick={handleUserPicture} style={{cursor: 'pointer'}}/>
                </div>
            </div>
            <hgroup className = 'flex-1'>
                <div className='bg-black bg-opacity-50 backdrop-filter backdrop-blur flex justify-end items-center'>
                    <input className = {`w-full bg-black bg-opacity-0 backdrop-filter backdrop-blur text-right text-white text-6xl font-bold p-8`}
                           value = { userName }
                           onChange = {(e) => setUserName(e.target.value)}/>
                    <Check className = 'w-16 h-16 text-white hover:bg-grey-700' onClick={handleName} style={{cursor: 'pointer'}}/>
                </div>
                <div className='p-8 flex justify-center space-x-44'>
                <span className='flex'>
                <Calendar className = 'h-10 w-10 mx-4 text-black-500'/>
                   <h1 className={`text-black text-4xl font-boldp-8`}> {user.birthday.day}/{user.birthday.month}/{user.birthday.year} </h1>
                </span>

                <span className='flex'>
                    <Point className = 'h-10 w-10 mx-4 text-black-500'/>
                    <input className={`w-44 text-black text-4xl font-boldp-8`} value={userLocation} onChange = {(e) => setUserLocation(e.target.value)}/>
                    <Check className = 'w-10 h-10 ml-2 hover:bg-grey-700' onClick={handleLocation} style={{cursor: 'pointer'}}/>
                </span>
                    <h1 className={`text-black text-4xl font-boldp-8`}> {user.email}  </h1>
                </div>
            </hgroup> </>}
    </header>
}