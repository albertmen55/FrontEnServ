import { Shell, MovieList, Carousel } from '../../components'

export default function Movies() {
    return <Shell>
        <Carousel query = {{sort: { releaseDate: 'DESC'}, pagination: { size: 7 }}} />

        {<section className = 'bg-pattern-1'>
            <MovieList title = 'Destacadas'
                       paginationVariant = 'inverse'
                       className = 'pt-6 pb-12 max-w-screen-2xl'
                       titleClassName = 'select-none bg-gradient-to-br from-pink-500 to-yellow-500 via-red-500 p-2 uppercase text-white inline-block transform -skew-x-12 -rotate-3 translate-y-4'
                       query = {{sort: { 'releaseDate': 'ASC' }, pagination: { size: 7 }}}
            />
        </section>}

        <section className = 'bg-pattern-2'>
            <MovieList title = 'Comedia'
                       paginationVariant = 'plain-secondary'
                       className = 'pt-6 pb-12 max-w-screen-2xl'
                       titleClassName = 'select-none bg-black p-2 uppercase text-white inline-block transform -skew-x-12 -rotate-3 translate-y-4'
                       query = {{filter: {'genres': 'Comedia'}, sort: { 'releaseDate': 'ASC' }, pagination: { size: 7 }}}
            />
        </section>

        <section className = 'bg-pattern-1'>
            <MovieList title = 'Dramas'
                       paginationVariant = 'primary'
                       className = 'pt-6 pb-12 max-w-screen-2xl'
                       titleClassName = 'select-none bg-gradient-to-br from-pink-500 to-yellow-500 via-red-500 p-2 uppercase text-white inline-block transform -skew-x-12 -rotate-3 translate-y-4'
                       query = {{filter: {'genres': 'Drama'}, sort: { 'releaseDate': 'ASC' }, pagination: { size: 7 }}}
            />
        </section>

        <section className = 'bg-pattern-2'>
            <MovieList title = 'Crímenes'
                       paginationVariant = 'plain-secondary'
                       className = 'pt-6 pb-12 max-w-screen-2xl'
                       titleClassName = 'select-none bg-black p-2 uppercase text-white inline-block transform -skew-x-12 -rotate-3 translate-y-4'
                       query = {{filter: {'genres': 'Crimen'}, sort: { 'releaseDate': 'ASC' }, pagination: { size: 7 }}}
            />
        </section>

        <section className = 'bg-pattern-1'>
            <MovieList title = 'Comedias'
                       paginationVariant = 'primary'
                       className = 'pt-6 pb-12 max-w-screen-2xl'
                       titleClassName = 'select-none bg-gradient-to-br from-pink-500 to-yellow-500 via-red-500 p-2 uppercase text-white inline-block transform -skew-x-12 -rotate-3 translate-y-4'
                       query = {{filter: {'genres': 'Comedia'}, sort: { 'releaseDate': 'ASC' }, pagination: { size: 7 }}}
            />
        </section>

        <section className = 'bg-pattern-2'>
            <MovieList title = 'Documentales'
                       paginationVariant = 'plain-secondary'
                       className = 'pt-6 pb-12 max-w-screen-2xl'
                       titleClassName = 'select-none bg-black p-2 uppercase text-white inline-block transform -skew-x-12 -rotate-3 translate-y-4'
                       query = {{filter: {'genres': 'Documental'}, sort: { 'releaseDate': 'ASC' }, pagination: { size: 7 }}}
            />
        </section>

    </Shell>
}