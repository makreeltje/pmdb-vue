<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="rgb(229, 160, 13)" dark flat>
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form name="form" @submit.prevent="register">
                  <v-text-field
                          v-model="username"
                          :rules="[rules.required, rules.min3]"
                          type="text"
                          label="Username"
                          prepend-icon="mdi-account"
                          counter
                          maxlength="20"
                          v-validate="'required|min:3|max:20'"
                          required
                  />

                  <v-text-field
                          v-model="email"
                          :rules="[rules.validEmail]"
                          type="email"
                          label="Email"
                          prepend-icon="mdi-email"
                          v-validate="'required|email|max:50'"
                          maxlength="50"
                          required
                  />

                  <v-text-field
                          v-model="password"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min6]"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                          label="Password"
                          prepend-icon="mdi-lock"
                          counter
                          maxlength="40"
                          v-validate="'required|min:6|max:40'"
                          required
                  />

                  <v-alert v-if="message" :type="successful ? 'success' : 'error'">{{ message }}</v-alert>

                  <v-layout align-end justify-end class="my-2">
                    <v-btn
                            type="submit"
                            color="rgb(229, 160, 13)"
                            :disabled="loading"
                            :loading="loading"
                    >Sign up
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
        name: "Register",
        data() {
            return {
                username: '',
                email: '',
                password: '',
                successful: false,
                loading: false,
                message: "",
                show: false,
                rules: {
                    required: v => !!v || 'This field is required',
                    min3: v => v.length >= 3 || 'Min 3 characters',
                    min6: v => v.length >= 6 || 'Min 6 characters',
                    validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                }
            };
        },
        computed: {},
        methods: {
            register() {
                this.$store.dispatch('register', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                })
                    .then(() => {
                        this.$router.push('/login')
                    })
                    .catch(error => {
                        this.loading = false;
                        this.message = error.response.data.message
                    })
            }
        }
    };
</script>