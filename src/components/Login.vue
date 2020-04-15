<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form name="form" @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="user.username"
                    :rules="[rules.required]"
                    type="text"
                    label="Username"
                    prepend-icon="mdi-account"
                    v-validate="'required'"
                    required
                  />

                  <v-text-field
                    v-model="user.password"
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
                      color="primary"
                      :disabled="loading"
                      :loading="loading"
                    >Login</v-btn>
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
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      show: false,
      rules: {
        required: v => !!v || 'This field is required'
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data.error) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>