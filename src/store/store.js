import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        movies: [],
        externalMovies: [],

    },
    getters: {
        getMovies(state) {
            return state.movies
        },
        getExternalMovies(state) {
            return state.externalMovies
        },
        loggedIn(state) {
            return state.token !== null
        }
    },
    mutations: {
        setMovies(state, movies) {
            state.movies = movies
        },
        setExternalMovies(state, externalMovies) {
            state.externalMovies = externalMovies
        },
        setToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        }

    },
    actions: {
        fetchMovies(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.get('/movies')
                .then(response => {
                    context.commit('setMovies', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        fetchExternalMovies(context, query) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.get('/request/movie', {
                params: {
                    'query' : query
                }
            })
                .then(response => {
                    context.commit('setExternalMovies', response.data)
                })
                .catch(error => {
                    console.log(error)
                })

        },
        fetchExternalPopularMovies(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.get('/request/movie/popular')
                .then(response => {
                    context.commit('setExternalMovies', response.data)
                })
                .catch(error => {
                    console.log(error)
                })

        },
        retrieveToken(context, credentials) {
                return axios.post('/auth/signin', {
                    username: credentials.username,
                    password: credentials.password,
                })
                    .then(response => {
                        const token = response.data.accessToken

                        localStorage.setItem('access_token', token)
                        /*localStorage.setItem('user', JSON.stringify(response.data));*/
                        context.commit('setToken', token)
                        return response
                    })
        },
        register(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/auth/signup', {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                })
                    .then(response => {

                        resolve(response)
                        //console.log(response)
                    })
                    .catch(error => {
                        reject(error)
                        //console.log(error)
                    })
            })
        },
        destroyToken(context) {
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            if (context.getters.loggedIn) {
                localStorage.removeItem('access_token')
                context.commit('destroyToken')
            }
        },
        requestMovie(context, model) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return axios.post('/request/movie/post', {
                theMovieDbId: (parseInt(model.tmdbid)),
                languageCode: model.language,
            })
        }

    }
});