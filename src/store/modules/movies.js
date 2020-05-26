import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    movies: [],
    movie: {},
};

const getters = {
    getMovies(state) {
        return state.movies
    },
    getMovie(state) {
        return state.movie
    }
};

const actions = {
    fetchMovies(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        axios.get('/movies')
            .then(response => {
                context.commit('setMovies', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchMovie(context, id) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        axios.get('/movies/' + id)
            .then(response => {
                context.commit('setMovie', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
};

const mutations = {
    setMovies(state, movies) {
        state.movies = movies
    },
    setMovie(state, movie) {
        state.movie = movie
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}