import {Button, Input, Logo, Shell, TODO} from '../../components'
import {useHistory} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthenticationContext} from "../../context";
import {useMovie} from "../../hooks";
import {FilmOutline} from "@graywolfai/react-heroicons";

export default function Profile() {
    const history = useHistory()
    const { updateFilm } = useMovie()
    const [ errors, setErrors ] = useState(false)

    const submit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target);
        const releaseDateValue = data.get("releaseDate");
        const formattedReleaseDate = releaseDateValue
            ? {
                day: releaseDateValue.split("/")[0],
                month: releaseDateValue.split("/")[1],
                year: releaseDateValue.split("/")[2],
            }
            : undefined;
        const currentUrl = window.location.href;
        const match = currentUrl.match(/\/movies\/(\d+)\/edit/);
        const id = match[1];
        const patchOperations = [
            { op: 'add', path: '/title', value: data.get("title") },
            { op: 'add', path: '/overview', value: data.get("overview")},
            { op: 'add', path: '/tagline', value: data.get("tagline") },
            { op: 'add', path: '/genres', value: data.get("genres")},
            { op: 'add', path: '/releaseDate', value: formattedReleaseDate},
            { op: 'add', path: '/keywords', value: data.get("keywords")},
            { op: 'add', path: '/producers', value: data.get("producers") },
            { op: 'add', path: '/crew', value: data.get("crew")},
            { op: 'add', path: '/cast', value: data.get("cast") },
            { op: 'add', path: '/resources', value: data.get("resources")},
            { op: 'add', path: '/budget', value: data.get("budget") },
            { op: 'add', path: '/status', value: data.get("status")},
        ].filter(operation => operation.value !== undefined && operation.value !== '');;
        try {
            await updateFilm(
                id, patchOperations
            )
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
            <Input type = 'text'
                   name = 'overview'
                   label = 'Overview'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'tagline'
                   label = 'Tagline'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'genres'
                   label = 'Genres'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'releaseDate'
                   label = 'Release Date'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'keywords'
                   label = 'Keywords'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'producers'
                   label = 'Producers'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'crew'
                   label = 'Crew'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'cast'
                   label = 'Cast'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'resources'
                   label = 'Resources'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'budget'
                   label = 'Budget'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Input type = 'text'
                   name = 'status'
                   label = 'Status'
                   labelClassName = 'mb-4'
                   errors = { errors }
                   onClick = { reset }
                   before = { FilmOutline }
                   variant = 'primary'
            />
            <Button className = 'mt-8' type = 'submit' variant = 'secondary'>Modificar Pelicula</Button>
        </form>
    </Shell>
}