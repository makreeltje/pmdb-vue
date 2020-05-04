<template>
    <v-app>
        <div>
            <v-app-bar color="primary" dark>
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
                                <v-list-item-title>Hello and welcome to the PMDB</v-list-item-title>
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

                    <router-link to="/admin">
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
                    </router-link>

                    <router-link v-if="loggedIn" to="/latestmovie">
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon>mdi-movie</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Movies</v-list-item-title>
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
    export default {
        data() {
            return {
                drawer: null
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
        }
    };
</script>

<style>
    .v-application a {
        text-decoration: none;
    }

    .v-parallax__content {
        background: linear-gradient(45deg, black, transparent);
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

    .wrap, .wrap-content, .content-submenu {
        max-width: 1300px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 20px;
        padding-right: 20px;
        width: 100%;
    }

    .content {
        width: 100%;
        float: left;
        padding: 0 0 50px 0;
    }

    .item-wrap {
        margin: 0 0 60px 0;
        position: relative;
        width: calc(99.9% * 1/6 - (30px - 30px * 1/6));
    }

    .item-image {
        -webkit-box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.5);
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.5);
        width: 100%;
        -webkit-transition: border 0.2s ease 0s;
        transition: border 0.2s ease 0s;
    }

    .item-image-wrap {
        position: relative;
        float: left;
        max-height: 278px;
        max-width: 185px;
        width: 100%;
        -webkit-transition: -webkit-box-shadow 0.2s ease 0s;
        transition: -webkit-box-shadow 0.2s ease 0s;
        transition: box-shadow 0.2s ease 0s;
        transition: box-shadow 0.2s ease 0s, -webkit-box-shadow 0.2s ease 0s;
    }

    .item-actions {
        position: absolute;
        top: 10px;
        right: 10px;
        opacity: 0;
        -webkit-transition: opacity 0.2s ease 0s;
        transition: opacity 0.2s ease 0s;
    }

    .item-content {
        float: left;
        width: 100%;
        max-width: 185px;
        margin: 20px 0 0 0;
    }

    .item-content .item-year, .item-content .item-genre {
        width: 100%;
        float: left;
        color: #888;
        font-size: 14px;
        margin: 0 5px 0 0;
    }

    .item-content .item-title {
        color: #484848;
        clear: both;
        font-size: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        text-decoration: none;
        float: left;
    }

    .item-content .item-year, .item-content .item-genre {
        width: 100%;
        float: left;
        color: #888;
        font-size: 14px;
        margin: 0 5px 0 0;
    }

    .item-data-wrap {
        float: left;
        width: 100%;
    }

    .item-data {
        float: left;
        margin: 0 0 40px 300px;
    }

    .item-data .item-year {
        float: left;
        clear: both;
    }

    .item-data .item-title {
        color: #fff;
        font-size: 34px;
        margin: 0 0 10px 0;
        float: left;
        clear: both;
    }

    .item-data .item-genre {
        float: left;
        clear: both;
    }

    .item-data .item-genre {
        float: left;
        clear: both;
    }
    .item-data .item-genre a{
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        background: rgba(72, 72, 72, 0.5);
        font-size: 14px;
        padding: 3px 7px;
        margin: 0 5px 5px 0;
        float: left;
        -webkit-transition: background 0.2s ease 0s;
        transition: background 0.2s ease 0s;
    }

    .subpage-poster-wrap .real {
        position: relative;
        z-index: 100;
        opacity: 0;
        -webkit-transition: opacity 1s ease 0s;
        transition: opacity 1s ease 0s;
    }

    .teaser-buttons {
        float: left;
        clear: both;
        margin: 0 0 0 272px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .teaser-buttons a {
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
        transition: background 0.2s ease 0s;
    }

    .big-teaser-buttons span, .big-teaser-buttons a {
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
        transition: background 0.2s ease 0s;
    }


    .button-netflix {
        background: #e50914;
        color: rgba(255, 255, 255, 0.9) !important;
    }

    .button-amazon {
        background: #ff9900;
        color: #484848 !important;
    }

    .button-apple {
        background: #444444;
        color: #fff !important;
    }
    .button-disney {
        background: #234c97;
        color: #fff !important;
    }
    .button-plex {
        background: #cc7b19;
        color: #484848 !important;
    }
    .button-tmdb-rating{
        background: #00d373;
        color: #484848 !important;
    }
    .button-imdb-rating{
        background: #e3b81f;
        color: #484848 !important;
    }
    .button-trailer {
        background: #484848;
        color: rgba(255, 255, 255, 0.9) !important;
    }
    .v-application a {

    }

</style>
