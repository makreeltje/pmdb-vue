import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Profile from './components/Profile.vue';
import BoardAdmin from './components/BoardAdmin.vue';
import BoardModerator from './components/BoardModerator.vue';
import BoardUser from './components/BoardUser.vue';
import LatestMovie from './components/LatestMovie.vue';
import Movie from './components/Movie.vue';
import SearchMovie from './components/SearchMovie';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
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
      component: Login
    },
    {
      path: '/register',
      component: Register
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
      path: '/latestmovie',
      name: 'movies',
      component: LatestMovie
    },
    {
      path: '/movies/:id',
      name: 'Movie',
      props: true,
      component: Movie
    },
    {
      path: '/search/:name',
      name: 'SearchMovie',
      props: true,
      component: SearchMovie
    }
  ]
});

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