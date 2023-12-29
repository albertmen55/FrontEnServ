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
                this.#token = code
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
        sessionStorage.clear()
        return true
    }

    async findMovies(filter) {
        //hay que construir el filter, basicamente ver que tiene
        let url = "http://localhost:8080/films?"
        for (let key in filter){
            for(let key2 in filter[key]){
                if(filter[key][key2] === ""){
                    continue
                }else if(key === "sort"){
                    //el srot es un caso especial, en el que podríamos tener varios parametros, ademas hay que traducir ASC y DESC a a y -
                    url = url + `sort=`
                    if(filter[key][key2] === "ASC"){
                        url = url + `a${key2}&`
                    }else if(filter[key][key2] === "DESC"){
                        url = url + `-${key2}&`
                    }else{
                        //se ha puesto mal el sort asi que va sin ordenar
                        console.log("error en el sort")
                    }
                }
                else{
                    url = url + `${key2}=${filter[key][key2]}&`
                }
            }
            //para todos los filtros que se pongan se añade a la url
            //para sort, tendremos que ver si es ASC o DESC y añadir todos los sort que se hayan puesto
        }
        if(url === "http://localhost:8080/films?"){
            //no hubo filtros
            url = "http://localhost:8080/films"
        }else{
            //hay que quitar el & final
            url = url.slice(0, -1)
        }
        const films = await fetch(url,{
            method: "GET",
            headers: { 'Content-Type': 'application/json',
                'Authorization': this.#token}})
        return await films.json()
    }
    async findMovie(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:8080/films/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${this.#token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const film = await response.json();
                    resolve(film);
                } else {
                    reject(`Error al obtener la pelicula: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
                reject(error);
            }
        });
    }
    async findUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:8080/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${this.#token}`,
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

    async findComments(filtro) {
        let url = "http://localhost:8080/comments?"
        for (let key in filtro){
            for(let key2 in filtro[key]){
                if(filtro[key][key2] === ""){
                    continue
                }else{
                    url = url + `${key2}=${filtro[key][key2]}&`
                }
            }
        }
        if(url === "http://localhost:8080/comments?"){
            url = "http://localhost:8080/comments"
        }else{
            url = url.slice(0, -1)
        }
        const response = await fetch(url,{
            method: "GET",
            headers: { 'Content-Type': 'application/json',
                'Authorization': this.#token
            }})
        return await response.json()
    }

    async createComment(comment) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = "http://localhost:8080/comments"
                const request = {
                    method: 'POST',
                    headers: {
                        'Authorization': `${this.#token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comment)
                };
                const response = await fetch(url, request);
                if (response.ok) {
                    const user = await response.json();
                    resolve(user);
                } else {
                    reject(`Error al crear el comentario: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
                reject(error);
            }
        });
    }

    async createFilm(film) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = "http://localhost:8080/films"
                const request = {
                    method: 'POST',
                    headers: {
                        'Authorization': `${this.#token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(film.title)
                };
                const response = await fetch(url, request);
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
    async createUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = "http://localhost:8080/users"
                const request = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user.email, name: user.name, password: user.password, birthday: user.birthday })

                };

                const response = await fetch(url, request);

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

    async updateUser(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = 'http://localhost:8080/users/' + id
                const request = {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `${this.#token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                };
                const response = await fetch(url, request);
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

    async updateFilm(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = 'http://localhost:8080/films/' + id
                const request = {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `${this.#token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                };
                const response = await fetch(url, request);
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

    async addFriend(id, friend) {
        const url = `http://localhost:8080/users/${id}/friends`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': this.#token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: friend.email, name: friend.name }),
            });

            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Error al añadir al amigo: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }


    async deleteFriend(id, friend) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:8080/users/${id}/friends/${friend}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `${this.#token}`
                    },
                });

                if (response.ok) {
                    const contentType = response.headers.get('Content-Type');
                    if (contentType && contentType.includes('application/json')) {
                        const user = await response.json();
                        resolve(user);
                    } else {
                        resolve();
                    }
                } else {
                    reject(`Error al eliminar el amigo: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
                reject(error);
            }
        });
    }


}