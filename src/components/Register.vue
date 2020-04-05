<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form name="form" @submit.prevent="handleRegister">
                  <v-text-field
                  v-model="user.username"
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
                  v-model="user.email"
                  :rules="[rules.validEmail]"
                  type="email"
                  label="Email"
                  prepend-icon="mdi-email"
                  v-validate="'required|email|max:50'"
                  maxlength="50"
                  required
                  />

                  <v-text-field
                  v-model="user.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
                  <v-text-field
                  v-model="confirmPassword"
                  :rules="[rules.confirmPassword]"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  label="Confirm Password"
                  prepend-icon="mdi-lock"
                  v-validate="'required|confirmed:password'"
                  required
                  />

                  <v-alert v-if="message" :type="successful ? 'success' : 'error'">{{message}}</v-alert>

                  <v-layout align-end justify-end class="my-2">
                    <v-btn
                    type="submit"
                    color="primary"
                    :disabled="loading"
                    :loading="loading"
                    >Sign up</v-btn>
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
  name: "Register",
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      loading: false,
      message: "",
      show: false,
      rules: {
        required: v => !!v || 'This field is required',
        min3: v => v.length >= 3 || 'Min 3 characters',
        min6: v => v.length >= 6 || 'Min 6 characters',
        validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        confirmPassword: v => v === this.user.password || 'Passwords must match'
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>