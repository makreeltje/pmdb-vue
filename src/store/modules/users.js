import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    token: localStorage.getItem('access_token') || null,
};

const getters = {
    loggedIn(state) {
        return state.token !== null
    },
    getToken(state) {
        return state.token
    }
};

const actions = {
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
};

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    destroyToken(state) {
        state.token = null
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}