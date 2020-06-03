<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="rgb(229, 160, 13)" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form name="form" @submit.prevent="login">
                  <v-text-field
                          v-model="username"
                          :rules="[rules.required]"
                          type="text"
                          label="Username"
                          prepend-icon="mdi-account"
                          v-validate="'required'"
                          required
                  />

                  <v-text-field
                          v-model="password"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required]"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                          label="Password"
                          prepend-icon="mdi-lock"
                          v-validate="'required'"
                          required
                  />

                  <v-alert v-if="message" type="error">{{message}}</v-alert>

                  <v-layout align-end justify-end class="my-2">
                    <v-btn
                            type="submit"
                            :disabled="loading"
                            :loading="loading"
                    >Login
                    </v-btn>
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
                loading: false,
                message: '',
                show: false,
                rules: {
                    required: v => !!v || 'This field is required'
                }
            };
        },
        methods: {
            login() {
                this.$store.dispatch('retrieveToken', {
                    username: this.username,
                    password: this.password,
                })
                    .then(() => {
                        this.$router.push('/movies')
                    })
                    .catch(error => {
                        this.loading = false;
                        this.message = error.response.data.message
                    })
            }
        },

    };
</script>