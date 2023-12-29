import { useEffect, useState } from 'react'

import API from '../api'

export function useMovies(query = {}) {
    const [data, setData] = useState({ content: [], pagination: { hasNext: false, hasPrevious: false }})
    const queryString = JSON.stringify(query)

    useEffect(() => {
        API.instance()
            .findMovies(JSON.parse(queryString))
            .then(resolve => {setData(resolve)})
    }, [queryString])
    return data
}

export function useMovie(id = '') {
    const [data, setData] = useState({})
    useEffect(() => {
        API.instance()
            .findMovie(id)
            .then(setData)
    }, [id])

    const createFilm = film => API.instance()
        .createFilm(film)
        .then(film => setData(film))

    const updateFilm = (id, body) => API.instance()
        .updateFilm(id, body)
        .then(user => setData(user))

    return {
        film: data,
        createFilm,
        updateFilm
    }
}

export function useUser(id = null) {
    const [data, setData] = useState([])
    const userId = id === null ? localStorage.getItem('user') : id

    useEffect(() => {
        API.instance()
            .findUser(userId)
            .then(user => {
                setData(user)
            })
    }, [userId])
    const create = user => API.instance()
            .createUser(user)
            .then(user => setData(user))


    const update = user => API.instance()
            .updateUser(id, user)
            .then(user => setData(user))

    const addF = friend => API.instance()
            .addFriend(userId, friend)
            .then(user => setData(user));


    const removeF = friend => API.instance()
            .deleteFriend(userId, friend)
            .then(user => setData(user));


    return {
        user: data,
        create,
        update,
        addF,
        removeF
    }
}


export function useComments(query = {}){
    const [data, setData] = useState({ content: [], pagination: { hasNext: false, hasPrevious: false }})
    const queryString = JSON.stringify(query)

    useEffect(() => {
        API.instance()
            .findComments(JSON.parse(queryString))
            .then(setData)
    }, [queryString])

    const create = comment => {
        console.log(comment)
        API.instance()
            .createComment(comment)
            .then( () => {
                API.instance()
                    .findComments(query)
                    .then(setData)
            })
    }

    return {
        comments: data,
        createComment: create
    }
}