import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import movies from './modules/movies'
import requests from './modules/requests'
import test from './modules/test'
import axios from "axios";


Vue.use(Vuex)
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default new Vuex.Store({
    modules: {
        users,
        movies,
        requests,
        test
    }
})
