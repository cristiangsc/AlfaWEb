<template>
  <div>
    <v-system-bar color="deep-purple darken-3"></v-system-bar>
    <v-app-bar
        color="deep-purple accent-4"
        dark
        prominent
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CURSO DE DESARROLLO ALFAWEB</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          @click="logout"
          target="_blank"
          text
      >
        <span class="mr-2">{{ user }}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="route in routes"
                       :key="route.name"
                       @click="redirectTo(route.name)"
                       :disabled="currentRoute === route.name">
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {getAuth, signOut} from "firebase/auth";

export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      group: null,
      routes: [
        {
          icon: 'mdi-home',
          title: 'Inicio',
          name: 'home'
        },
        {
          icon: 'mdi-border-all',
          title: 'Cursos',
          name: 'cursos'
        },
        {
          icon: 'mdi-account',
          title: 'Acerca',
          name: 'about'
        }
      ]
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  computed: {
    currentRoute() {
      return this.$route.name
    },
    user() {
      const nameUser = getAuth()
      return nameUser.currentUser.email
    }
  },
  methods: {
    redirectTo(nameRoute) {
      this.$router.push({name: nameRoute})
    },
    logout() {
      const auth = getAuth()
      signOut(auth)
          .then(() => {
            // Sign-out successful.
            this.$router.push('/login')
          })
          .catch((error) => {
            // An error happened.
            console.log(error)
          })
    }
  },
}
</script>

<style scoped>

</style>





