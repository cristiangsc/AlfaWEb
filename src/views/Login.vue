<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <h1 class="text-center mb-4">SISTEMA ALFAWEB</h1>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Bienvenido/a</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      v-model="user"
                      prepend-icon="person"
                      name="login"
                      label="Login"
                      type="text"
                      :rules="[rules.required, rules.email]"
                  ></v-text-field>
                  <v-text-field
                      v-model="pass"
                      id="password"
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      :type="show1 ? 'text' : 'password'"
                      counter
                      minlength="6"
                      :rules="[rules.required, rules.counter]"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show1 = !show1"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" to="/register">Registrarse</v-btn>
                <v-btn color="primary" @click="login">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
export default {
  name: 'Login',
  data() {
    return {
      user: '',
      pass: '',
      show1:false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 6 || 'Min 6 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  methods: {
    login() {
      if (!this.user =='' && !this.pass =='') {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, this.user, this.pass)
            .then((userCredential) => {
              const user = userCredential.user
              this.$router.push('/')
            })
            .catch((error) => {
              if (error.code === 'auth/user-not-found') {
                alert('Usuario no encontrado')
              } else if (error.code === 'auth/wrong-password') {
                alert('Contraseña incorrecta')
              }
            })
      }
    },
  },
}

</script>

<style></style>