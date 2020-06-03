<template>
  <v-content>
    <NavBar :title="title"/>
    <v-container>
      <v-row>
        <v-col cols="6">
            <!--<v-data-table
                    v-model="getUsers"
                    :headers="headers"
                    :items="getUsers"
                    :single-select="singleSelect"
                    item-key="username"
                    show-select

            >
              <template v-slot:item.role="{item}"><span v-for="(role, index) in item.roles" :key="index">{{role.name}} </span></template>
              <v-btn>add</v-btn>
            </v-data-table>-->


            <v-data-table
                    :headers="headers"
                    :items="getUsers"
                    sort-by="username"
                    class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Users</v-toolbar-title>
                  <v-divider
                          class="mx-4"
                          inset
                          vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="getUsers.username" label="Username"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="getUsers.email" label="Email"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="getUsers.roles" label="Roles"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <!--<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>-->
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.role="{item}"><span v-for="(role, index) in item.roles" :key="index">{{role.name}} </span></template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title>Whitelist</v-card-title>
            <v-card-text>
              <v-list-item-content v-for="(item, index) in getUsers" :key="index">
                <v-list-item-title>{{item.email}}</v-list-item-title>
              </v-list-item-content>
            </v-card-text>
            <v-card-actions>
              <v-btn>Add</v-btn>
              <v-btn>Remove</v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>


      <!---->
    </v-container>
  </v-content>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import NavBar from "./NavBar"

    export default {
        name: "Admin Dashboard",
        components: {NavBar},
        data() {
            return {
                title: 'Admin Dashboard',
                headers: [
                    {
                        text: 'Username',
                        align: 'start',
                        value: 'username'
                    },
                    {
                        text: 'Email',
                        align: 'start',
                        value: 'email',
                    },
                    {
                        text: 'Roles',
                        align: 'start',
                        value: 'role',
                    },

                ]
            }
        },
        methods: {
            ...mapActions(['fetchAllUsers'])
        },
        mounted() {
            this.fetchAllUsers()
        },
        computed: {
            ...mapGetters(['getUsers'])
        }
    }
</script>

<style scoped>

</style>