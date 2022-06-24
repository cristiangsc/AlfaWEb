<template>
  <v-app>
   <nav-bar v-if="isPrivateRoute"></nav-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {
    'nav-bar' :NavBar
  },

  data: () => ({
    //
  }),
  computed:{
    isPrivateRoute(){
      if(this.$route.meta.private) return true
      return false
    }
  },
};
</script>
