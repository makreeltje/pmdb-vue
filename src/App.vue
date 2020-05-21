<template>
    <v-app>
        <div>
            <v-app-bar color="#e5a00d" dark>
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                <v-toolbar-title>PMDB</v-toolbar-title>

                <v-spacer></v-spacer>

                <div v-if="!loggedIn">
                    <router-link to="/register">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>mdi-account-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Register</span>
                        </v-tooltip>
                    </router-link>

                    <router-link to="/login">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>mdi-login</v-icon>
                                </v-btn>
                            </template>
                            <span>Login</span>
                        </v-tooltip>
                    </router-link>
                </div>

                <div v-if="loggedIn">
                    <router-link to="/profile">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>mdi-account</v-icon>
                                </v-btn>
                            </template>
                            <span>Profile</span>
                        </v-tooltip>
                    </router-link>
                    <router-link to="/logout">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-logout</v-icon>
                            </v-btn>
                        </template>
                        <span>Logout</span>
                    </v-tooltip>
                    </router-link>
                </div>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-switch color="secondary" v-on="on" v-model="$vuetify.theme.dark" hide-details inset></v-switch>
                    </template>
                    <span>Dark</span>
                </v-tooltip>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" absolute temporary>
                <v-list>
                    <router-link to="/profile">
                        <v-list-item v-if="loggedIn">
                            <v-list-item-content>
                                <v-list-item-title>Welcome </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>
                </v-list>

                <v-list-item v-if="!loggedIn">
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Logged out</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list>
                    <router-link to="/home">
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Home</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>

                    <!--<router-link to="/admin">
                        <v-list-item v-if="loggedIn" link>
                            <v-list-item-icon>
                                <v-icon>mdi-gavel</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Admin Dashboard</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>

                    <router-link to="/mod">
                        <v-list-item v-if="loggedIn" link>
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Moderator Dashboard</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>

                    <router-link v-if="loggedIn" to="/user">
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>User Dashboard</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>-->

                    <router-link v-if="loggedIn" to="/movies">
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon>mdi-movie</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Movies</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>

                    <router-link v-if="loggedIn" to="/request">
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon>mdi-movie-search</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Request</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn block href @click.prevent="logOut">Logout</v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
        </div>

        <div>
            <v-content>
                <router-view />
            </v-content>
        </div>
    </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                drawer: null,

            };
        },
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            }
        },
        created() {
            axios.interceptors.response.use(
                    response => response,
                    error => {
                        const status = error.response.status;
                        if (status === 401) {
                            this.$router.push("/logout");
                        }
                        return Promise.reject(error);
                    }
            );
        }
    };
</script>

<style>
    .v-application a {
        text-decoration: none;
    }

    .v-parallax__content {
        background: linear-gradient(0deg, #121212 1%, transparent);
    }

    .overview {
        width: calc(100% - 310px);
        float: right;
        padding: 0 0 30px 0;
    }

    .sidebar {
        float: left;
        margin: -330px 0 0 0;
        position: relative;
        z-index: 50;
    }

    .flex-container {
        /* We first create a flex layout context */
        display: flex;

        /* Then we define the flow direction
           and if we allow the items to wrap
         * Remember this is the same as:
         * flex-direction: row;
         * flex-wrap: wrap;
         */
        flex-flow: row wrap;

        /* Then we define how is distributed the remaining space */
        justify-content: space-evenly;

        padding: 0;
        margin: 0;
        list-style: none;
    }

    .flex-item {
        padding: 20px;
        margin-top: 10px;
    }
    .v-application a.link {
        color: #e5a00d;
    }

    .wrap,
    .wrap-content,
    .content-submenu {
        max-width: 1300px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 20px;
        padding-right: 20px;
        width: 100%; }

    .wrap:before,
    .wrap-content:before,
    .content-submenu:before {
        content: '';
        display: table; }

    .wrap:after,
    .wrap-content:after,
    .content-submenu:after {
        content: '';
        display: table;
        clear: both; }

    @media (max-width: 1320px) {
        .wrap-content,
        .content-submenu {
            max-width: 1120px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;
            padding-right: 20px; }
        .wrap-content:before,
        .content-submenu:before {
            content: '';
            display: table; }
        .wrap-content:after,
        .content-submenu:after {
            content: '';
            display: table;
            clear: both; } }

    @media (max-width: 1140px) {
        .wrap-content,
        .content-submenu {
            max-width: 960px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;
            padding-right: 20px; }
        .wrap-content:before,
        .content-submenu:before {
            content: '';
            display: table; }
        .wrap-content:after,
        .content-submenu:after {
            content: '';
            display: table;
            clear: both; } }

    @media (max-width: 860px) {
        .wrap-content,
        .content-submenu {
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;
            padding-right: 20px; }
        .wrap-content:before,
        .content-submenu:before {
            content: '';
            display: table; }
        .wrap-content:after,
        .content-submenu:after {
            content: '';
            display: table;
            clear: both; } }

    @media (max-width: 740px) {
        .wrap-content,
        .content-submenu {
            max-width: 620px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;
            padding-right: 20px; }
        .wrap-content:before,
        .content-submenu:before {
            content: '';
            display: table; }
        .wrap-content:after,
        .content-submenu:after {
            content: '';
            display: table;
            clear: both; } }

    @media (max-width: 450px) {
        .wrap-content,
        .content-submenu {
            max-width: 290px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;
            padding-right: 20px; }
        .wrap-content:before,
        .content-submenu:before {
            content: '';
            display: table; }
        .wrap-content:after,
        .content-submenu:after {
            content: '';
            display: table;
            clear: both; } }

    .item-wrap {
        margin: 0 0 60px 0;
        position: relative;
        width: calc(99.9% * 1/6 - (30px - 30px * 1/6)); }

    .item-wrap:nth-child(1n) {
        float: left;
        margin-right: 30px;
        clear: none; }

    .item-wrap:last-child {
        margin-right: 0; }

    .item-wrap:nth-child(6n) {
        margin-right: 0;
        float: right; }

    .item-wrap:nth-child(6n + 1) {
        clear: both; }
    @media (max-width: 1320px) {
        .item-wrap {
            width: calc(99.9% * 1/4 - (30px - 30px * 1/4)); }
        .item-wrap:nth-child(1n) {
            float: left;
            margin-right: 30px;
            clear: none; }
        .item-wrap:last-child {
            margin-right: 0; }
        .item-wrap:nth-child(4n) {
            margin-right: 0;
            float: right; }
        .item-wrap:nth-child(4n + 1) {
            clear: both; } }
    @media (max-width: 860px) {
        .item-wrap {
            width: calc(99.9% * 1/3 - (30px - 30px * 1/3)); }
        .item-wrap:nth-child(1n) {
            float: left;
            margin-right: 30px;
            clear: none; }
        .item-wrap:last-child {
            margin-right: 0; }
        .item-wrap:nth-child(3n) {
            margin-right: 0;
            float: right; }
        .item-wrap:nth-child(3n + 1) {
            clear: both; } }
    @media (max-width: 620px) {
        .item-wrap {
            width: calc(99.9% * 1/2 - (30px - 30px * 1/2));
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column; }
        .item-wrap:nth-child(1n) {
            float: left;
            margin-right: 30px;
            clear: none; }
        .item-wrap:last-child {
            margin-right: 0; }
        .item-wrap:nth-child(2n) {
            margin-right: 0;
            float: right; }
        .item-wrap:nth-child(2n + 1) {
            clear: both; } }

    .big-teaser-buttons {
        float: left;
        clear: both;
        margin: 0 0 0 272px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex; }
    .big-teaser-buttons span,
    .big-teaser-buttons a {
        float: left;
        padding: 6px 14px;
        font-size: 17px;
        cursor: pointer;
        text-decoration: none;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        -ms-flex: auto;
        flex: auto;
        -webkit-transition: background 0.2s ease 0s;
        transition: background 0.2s ease 0s; }
    @media (max-width: 740px) {
        .big-teaser-buttons span,
        .big-teaser-buttons a {
            font-size: 15px; } }
    @media (max-width: 450px) {
        .big-teaser-buttons span,
        .big-teaser-buttons a {
            width: auto; } }
    @media (max-width: 860px) {
        .big-teaser-buttons {
            margin: 0 0 0 200px; } }
    @media (max-width: 740px) {
        .big-teaser-buttons {
            margin: 0 0 0 -20px;
            width: 100%; } }
    @media (max-width: 450px) {
        .big-teaser-buttons {
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column; } }

    .big-teaser-item-data {
        float: left;
        margin: 0 0 40px 300px; }
    .big-teaser-item-data .item-year,
    .big-teaser-item-data .item-title,
    .big-teaser-item-data .item-genre {
        float: left;
        clear: both; }
    .big-teaser-item-data .item-title {
        color: #fff;
        font-size: 34px;
        margin: 0 0 10px 0; }
    @media (max-width: 740px) {
        .big-teaser-item-data .item-title {
            font-size: 18px; } }
    .big-teaser-item-data .item-year,
    .big-teaser-item-data .item-genre {
        color: rgba(255, 255, 255, 0.8); }
    .big-teaser-item-data .item-year a,
    .big-teaser-item-data .item-genre a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        background: rgba(72, 72, 72, 0.5);
        font-size: 14px;
        padding: 3px 7px;
        margin: 0 5px 5px 0;
        float: left;
        -webkit-transition: background 0.2s ease 0s;
        transition: background 0.2s ease 0s; }
    .big-teaser-item-data .item-year a:last-child,
    .big-teaser-item-data .item-genre a:last-child {
        margin: 0; }
    .big-teaser-item-data .item-year a:hover,
    .big-teaser-item-data .item-genre a:hover {
        background: #484848; }
    .big-teaser-item-data .item-year a:active,
    .big-teaser-item-data .item-genre a:active {
        background: rgba(72, 72, 72, 0.7); }
    .big-teaser-item-data .item-year i,
    .big-teaser-item-data .item-genre i {
        font-style: normal;
        text-transform: uppercase; }
    @media (max-width: 860px) {
        .big-teaser-item-data {
            margin: 0 0 40px 230px; } }
    @media (max-width: 740px) {
        .big-teaser-item-data {
            clear: both;
            margin: 30px 0 40px 0; } }

    .big-teaser-image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 100% 25%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0;
        -webkit-transition: opacity 1s ease 0s;
        transition: opacity 1s ease 0s; }
    .active .big-teaser-image {
        opacity: .2; }
    .open-modal .big-teaser-image {
        padding-right: 17px; }

    .big-teaser-data-wrap {
        float: left;
        width: 100%; }

    .big-teaser-content {
        position: absolute;
        bottom: 0; }
    @media (max-width: 740px) {
        .big-teaser-content {
            width: 100%; } }
    .button-trailer {
        background: #484848;
        color: rgba(255, 255, 255, 0.9) !important; }
    .button-trailer:hover {
        background: #555555; }
    .button-trailer:active {
        background: #484848; }

    .button-watchlist {
        background: #238cce;
        color: rgba(255, 255, 255, 0.9) !important; }
    .button-watchlist:hover {
        background: #2f99dc; }
    .button-watchlist:active {
        background: #238cce; }

    .button-tmdb-rating {
        background: #00d373;
        color: #484848 !important; }
    .button-tmdb-rating i {
        font-style: normal; }
    .button-tmdb-rating:hover {
        background: #00ed81; }
    .button-tmdb-rating:active {
        background: #00d373; }

    .button-imdb-rating {
        background: #e3b81f;
        color: #484848 !important; }
    .button-imdb-rating i {
        font-style: normal; }
    .button-imdb-rating:hover {
        background: #e9c64c; }
    .button-imdb-rating:active {
        background: #e3b81f; }

    .button-netflix {
        background: #e50914;
        color: rgba(255, 255, 255, 0.9) !important; }
    .button-netflix i {
        font-style: normal; }
    .button-netflix:hover {
        background: #f72a35; }
    .button-netflix:active {
        background: #e50914; }

    .button-amazon {
        background: #ff9900;
        color: #484848 !important; }
    .button-amazon i {
        font-style: normal; }
    .button-amazon:hover {
        background: #ffad33; }
    .button-amazon:active {
        background: #ff9900; }

    .button-disney {
        background: #234c97;
        color: #fff !important; }
    .button-disney i {
        font-style: normal; }
    .button-disney:hover {
        background: #2d61c0; }
    .button-disney:active {
        background: #234c97; }

    .button-apple {
        background: #444444;
        color: #fff !important; }
    .button-apple i {
        font-style: normal; }
    .button-apple:hover {
        background: #5e5e5e; }
    .button-apple:active {
        background: #444444; }

    .subpage-content {
        width: 100%;
        float: left;
        padding: 0 0 50px 0; }
    .open-modal .subpage-content {
        padding-right: 17px; }

    .subpage-sidebar {
        float: left;
        margin: -330px 0 0 0;
        position: relative;
        z-index: 50; }
    @media (max-width: 860px) {
        .subpage-sidebar {
            margin: -250px 0 0 0; } }
    @media (max-width: 620px) {
        .subpage-sidebar {
            margin: 0; } }
    @media (max-width: 740px) {
        .subpage-sidebar {
            width: 100%;
            margin: 0 0 30px 0; } }

    .subpage-overview {
        width: calc(100% - 310px);
        float: right;
        padding: 0 0 30px 0; }
    @media (max-width: 860px) {
        .subpage-overview {
            width: calc(100% - 240px); } }
    @media (max-width: 740px) {
        .subpage-overview {
            margin: 0;
            width: 100%; } }
    @media (max-width: 450px) {
        .subpage-overview h2 {
            font-size: 14px; } }
    .subpage-overview p {
        float: left;
        clear: both;
        color: #484848;
        font-size: 15px;
        line-height: 19pt; }
    @media (max-width: 450px) {
        .subpage-overview p {
            font-size: 14px; } }
    .dark .subpage-overview p {
        color: #717171; }

    .subpage-poster-wrap-mobile {
        float: left;
        position: relative;
        display: none; }
    @media (max-width: 740px) {
        .subpage-poster-wrap-mobile {
            display: block; } }
    .subpage-poster-wrap-mobile .base {
        -webkit-box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0; }
    .subpage-poster-wrap-mobile .real {
        position: relative;
        z-index: 100;
        opacity: 0;
        -webkit-transition: opacity 1s ease 0s;
        transition: opacity 1s ease 0s; }
    .active .subpage-poster-wrap-mobile .real {
        opacity: 1; }

    .subpage-poster-wrap {
        float: left;
        position: relative;
        max-height: 408px; }
    .subpage-poster-wrap img {
        border: 0; }
    @media (max-width: 860px) {
        .subpage-poster-wrap img {
            max-width: 200px;
            height: auto; } }
    .subpage-poster-wrap .base {
        -webkit-box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0; }
    .subpage-poster-wrap .real {
        position: relative;
        z-index: 100;
        opacity: 0;
        -webkit-transition: opacity 1s ease 0s;
        transition: opacity 1s ease 0s; }
    .active .subpage-poster-wrap .real {
        opacity: 1; }
    @media (max-width: 740px) {
        .subpage-poster-wrap {
            display: none; } }

    .item-image-wrap {
        position: relative;
        float: left;
        max-height: 278px;
        max-width: 185px;
        width: 100%;
        margin-bottom: 10px;
        -webkit-transition: -webkit-box-shadow 0.2s ease 0s;
        transition: -webkit-box-shadow 0.2s ease 0s;
        transition: box-shadow 0.2s ease 0s;
        transition: box-shadow 0.2s ease 0s, -webkit-box-shadow 0.2s ease 0s; }
    .item-image-wrap:hover {
        -webkit-box-shadow: 0 0 2px 2px #e5a00d;
        box-shadow: 0 0 2px 2px #e5a00d; }

    .item-image {
        -webkit-box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.5);
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.5);
        width: 100%;
        -webkit-transition: border 0.2s ease 0s;
        transition: border 0.2s ease 0s; }

    .item-content {
        width: 100%;
        max-width: 185px;
    margin-top: 5px;}
    .item-content .item-year,
    .item-content .item-genre {
        width: 100%;
        float: left;
        color: #888;
        font-size: 14px; }


</style>
