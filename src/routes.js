import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';

// auth
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Logout from './components/auth/Logout.vue';

// Test boards
import BoardAdmin from './components/BoardAdmin.vue';
import BoardModerator from './components/BoardModerator.vue';
import BoardUser from './components/BoardUser.vue';

// Movies
import Movies from './components/movies/Movies.vue';
import Movie from './components/movies/Movie.vue';

import SearchMovie from './components/SearchMovie';
import Profile from './components/Profile.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/admin',
        name: 'admin',
        component: BoardAdmin
    },
    {
        path: '/mod',
        name: 'moderator',
        component: BoardModerator
    },
    {
        path: '/user',
        name: 'user',
        component: BoardUser
    },
    {
        path: '/movies',
        name: 'movies',
        component: Movies,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/movies/:id',
        name: 'movie',
        props: true,
        component: Movie,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/search/:name',
        name: 'SearchMovie',
        props: true,
        component: SearchMovie,
        meta: {
            requiresAuth: true,
        }
    }
]

export default routes

// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login', '/register', '/home'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');

//     // trying to access a restricted page + not logged in
//     // redirect to login page
//     if (authRequired && !loggedIn) {
//       next('/login');
//     } else {
//       next();
//     }
//   });