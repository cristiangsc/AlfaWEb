<template>
  <div class="home">
    <h1 class="text-center titulo">Lista de Cursos</h1>
    <div>
      <card/>
    </div>


  </div>
</template>

<script>

import Card from "@/components/Card"


export default {
  name: 'Home',

  components: {
    'card': Card
  },
}
</script>

<style scoped>
.home {
  margin-top: 2rem;
}
.titulo{
  font-size: 50px;
}
</style>
