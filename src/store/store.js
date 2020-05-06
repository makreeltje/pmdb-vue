import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        movies: [],

    },
    getters: {
        moviesFiltered(state) {
            return state.movies
        },
        loggedIn(state) {
            return state.token !== null
        }
    },
    mutations: {
        retrieveMovies(state, movies) {
            state.movies = movies
        },
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        }

    },
    actions: {
        retrieveMovies(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.get('/movies')
                .then(response => {
                    context.commit('retrieveMovies', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/auth/signin', {
                    username: credentials.username,
                    password: credentials.password,
                })
                    .then(response => {
                        const token = response.data.accessToken

                        localStorage.setItem('access_token', token)
                        localStorage.setItem('user', JSON.stringify(response.data));
                        context.commit('retrieveToken', token)
                        resolve(response)
                        //console.log(response)
                    })
                    .catch(error => {
                        reject(error)
                        //console.log(error)

                    })
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
        }

    }
});