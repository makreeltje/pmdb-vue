import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    publicContent: '',
    userContent: '',
    moderatorContent: '',
    adminContent: '',
};

const getters = {
    getPublicContent(state) {
        return state.publicContent
    },
    getUserContent(state) {
        return state.userContent
    },
    getModeratorContent(state) {
        return state.moderatorContent
    },
    getAdminContent(state) {
        return state.adminContent
    },
};

const actions = {
    fetchPublicContent(context) {
        return axios.get('/test/all')
            .then(response => {
                context.commit('setPublicContent', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchUserBoard(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        return axios.get('/test/user')
            .then(response => {
                context.commit('setUserContent', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchModeratorBoard(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        return axios.get('/test/mod')
            .then(response => {
                context.commit('setModeratorContent', response.data)
            })
            .catch(error => {
                console.log(error)
            })

    },
    fetchAdminBoard(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getToken
        return axios.get('/test/admin')
            .then(response => {
                context.commit('setAdminContent', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

};

const mutations = {
    setPublicContent(state, publicContent) {
        state.publicContent = publicContent
    },
    setUserContent(state, userContent) {
        state.userContent = userContent
    },
    setModeratorContent(state, moderatorContent) {
        state.moderatorContent = moderatorContent
    },
    setAdminContent(state, adminContent) {
        state.adminContent = adminContent
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}