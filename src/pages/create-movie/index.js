import {Button, Input, Logo, Shell, TODO} from '../../components'
import {FilmOutline, CalendarOutline, FingerPrintOutline, UserOutline} from "@graywolfai/react-heroicons";
import {useHistory} from "react-router-dom";
import {AuthenticationContext} from "../../context";
import {useMovie, useUser} from "../../hooks";
import {useContext, useState} from 'react'

export default function CreateMovie() {
    const history = useHistory()
    const { isAuthenticated } = useContext(AuthenticationContext)
    const { createFilm } = useMovie()
    const [ errors, setErrors ] = useState(false)


    const submit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)

        try {
                await createFilm({
                    title: data.get('title')
                })

                history.push('/')

        } catch (err) {
            setErrors(true)
        }
    }

    const reset = () => {
        setErrors(false)
    }
    return <Shell className = 'p-4'>
        <form className = 'bg-white rounded shadow p-8 flex flex-col text-teal-900'
              onSubmit = { submit }
              autoComplete = 'off'>
            <Logo className = 'text-6xl mb-8' logoSize = 'w-12 h-12'/>
            <Input type = 'text'
                   name = 'title'
                   label = 'Título'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Button className = 'mt-8' type = 'submit' variant = 'secondary'>Crear Película</Button>
        </form>
    </Shell>
}