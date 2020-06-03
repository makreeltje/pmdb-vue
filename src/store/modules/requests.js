import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    externalMovies: [],
};

const getters = {
    getExternalMovies: state => state.externalMovies
};

const actions = {
    fetchExternalMovies(context, query) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
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
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        axios.get('/request/movie/popular')
            .then(response => {
                context.commit('setExternalMovies', response.data)
            })
            .catch(error => {
                console.log(error)
            })

    },
    requestMovie(context, model) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        return axios.post('/request/movie/post', {
            theMovieDbId: (parseInt(model.tmdbid)),
            languageCode: model.language,
        })
    }
};

const mutations = {
    setExternalMovies(state, externalMovies) {
        state.externalMovies = externalMovies
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}