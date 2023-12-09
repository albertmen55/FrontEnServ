import DATA from './data'

let __instance = null

export default class API {
    #token = sessionStorage.getItem('token') || null

    static instance() {
        if(__instance == null)
            __instance = new API()

        return __instance
    }

    async login(email, pass) {
        const url = "http://localhost:8080/login"
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: pass })
        }
        try {
            const response = await fetch(url, request);
            console.log(response)
            if (response.ok) {
                const code = response.headers.get("authentication");
                sessionStorage.setItem('token', code)
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    }
    async logout() {
        this.#token = null
        localStorage.clear()

        return true
    }
    async findMovies(
        {
            filter: { genre = '', title = '', status = '' } = { genre : '', title : '', status : '' },
            sort,
            pagination: {page = 0, size = 7} = { page: 0, size: 7 }
        } = {
            filter: { genre : '', title : '', status : '' },
            sort: {},
            pagination: { page: 0, size: 7 }
        }
    ) {
        return new Promise(resolve => {
            const filtered = DATA.movies
                ?.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase() || ''))
                ?.filter(movie => genre !== '' ? movie.genres.map(genre => genre.toLowerCase()).includes(genre.toLowerCase()) : true)
                ?.filter(movie => movie.status.toLowerCase().includes(status.toLowerCase() || ''))

            const data = {
                content: filtered?.slice(size * page, size * page + size),
                pagination: {
                    hasNext: size * page + size < filtered.length,
                    hasPrevious: page > 0
                }
            }

            resolve(data)
        })
    }
    async findMovie(id) {
        return DATA.movies.find(movie => movie.id === id)
    }
    async findUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:8080/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const user = await response.json();
                    resolve(user);
                } else {
                    reject(`Error al obtener usuario: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
                reject(error);
            }
        });
    }

    async findComments(
        {
            filter: { movie = '', user = '' } = { movie: '', user: '' },
            sort,
            pagination: {page = 0, size = 10} = { page: 0, size: 10}
        } = {
            filter: { movie: '', user: '' },
            sort: {},
            pagination: { page: 0, size: 10}
        }
    ) {
        return new Promise(resolve => {
            const filtered = DATA.comments
                ?.filter(comment => comment?.movie?.id === movie)

            const data = {
                content: filtered?.slice(size * page, size * page + size),
                pagination: {
                    hasNext: size * page + size < filtered.length,
                    hasPrevious: page > 0
                }
            }

            resolve(data)
        })
    }

    async createComment(comment) {
        return new Promise(resolve => {
            DATA.comments.unshift(comment)

            resolve(true)
        })
    }

    //NO FUNCIONA
    async createUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:8080/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: user })
                });

                if (response.ok) {
                    const user = await response.json();
                    resolve(user);
                } else {
                    reject(`Error al crear el usuario: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
                reject(error);
            }
        });
    }

    async updateUser(id, user) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:8080/users/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user })
                });

                if (response.ok) {
                    const user = await response.json();
                    resolve(user);
                } else {
                    reject(`Error al modificar el usuario: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
                reject(error);
            }
        });
    }
}