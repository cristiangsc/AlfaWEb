<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registrar nuevo Usuario/a</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                      v-model="email"
                      prepend-icon="person"
                      name="login"
                      label="Login"
                      type="text"
                      :rules="[rules.required, rules.email]"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      id="password"
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      :type="show1 ? 'text' : 'password'"
                      counter
                      minlength="6"
                      hint="Password debe tener un mínimo de 6 caracteres"
                      :rules="[rules.required, rules.counter]"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show1 = !show1"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="confirmPassword"
                      name="confirmPassword"
                      prepend-icon="lock"
                      label="Confirmar Password"
                      :type="show2 ? 'text' : 'password'"
                      placeholder="confirmar password"
                      required
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show2 = !show2"
                  ></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click.stop="register">Grabar</v-btn>
                <v-btn color="primary" to="/login">Ir al Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export default {
  name: "App",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 6 || 'Min 6 characteres',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
      show1: false,
      show2: false,
    }
  },
  methods: {
    register() {
      if (!this.email =='' && !this.password =='') {
        if (this.password === this.confirmPassword) {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.email, this.password)
              .then((userCredential) => {
                const user = userCredential.user;
                alert("Registrado con éxito")
                this.$refs.form.reset();
                this.$router.push('/')
              })
              .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                  alert("Este usuario ya se encuentra registrado")
                }
              });
        } else {
          alert("la contraseña no coincidió")
        }
      }
    }
  },

};
</script>