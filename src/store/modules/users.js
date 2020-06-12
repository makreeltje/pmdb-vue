import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    token: localStorage.getItem('access_token') || null,
    roles: localStorage.getItem('roles') || null,
    username: localStorage.getItem('username') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    users: []
};

const getters = {
    loggedIn: state => state.token !== null,
    getToken: state => state.token,
    getUsername: state => state.username,
    getRoles: state => state.roles,
    getUsers: state => state.users,
    getUser: state => state.user
};

const actions = {
    retrieveToken(context, credentials) {
        return axios.post('/auth/signin/', {
            username: credentials.username,
            password: credentials.password,
        })
            .then(response => {
                localStorage.setItem('access_token', response.data.accessToken)
                localStorage.setItem('roles', JSON.stringify(response.data.roles))
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('user', JSON.stringify(response.data))
                context.commit('setToken', response.data.accessToken)
                context.commit('setRoles', response.data)
                context.commit('setUsername', response.data.username)
                context.commit('setUser', response.data)
                return response
            })
    },
    register(context, data) {
        return new Promise((resolve, reject) => {
            axios.post('/auth/signup/', {
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
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        if (context.getters.loggedIn) {
            localStorage.removeItem('user')
            context.commit('destroyToken')
        }
    },
    fetchAllUsers(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        return axios.get('/auth/users/')
            .then(response => {
                context.commit('setUsers', response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
};

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setRoles(state, roles) {
        state.roles = roles
    },
    setUsername(state, username) {
        state.username = username
    },
    setUsers(state, users) {
        state.users = users
    },
    destroyToken(state) {
        state.token = null
    },
    setUser(state, user) {
        state.user = user
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}