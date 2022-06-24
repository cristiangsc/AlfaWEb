<template>
  <div class="container">
    <v-alert
        dense
        type="info"
    >
      Número de alumnos permitidos: {{ getInfo.cupos }}
    </v-alert>
    <v-alert
        dense
        text
        type="success"
    >
      Número de alumnos inscritos: {{ getInfo.inscritos }}
    </v-alert>
    <v-alert
        dense
        border="left"
        type="warning"
    >
      Cantidad de cupos disponibles: {{ getInfo.disponibles }}
    </v-alert>
    <v-alert
        dense
        outlined
        type="error"
    >
      Cantidad de cursos culminados: {{ getInfo.terminados }}
    </v-alert>
    <v-alert
        dense
        type="info"
    >
      Cantidad de cursos activos: {{ getInfo.activos }}
    </v-alert>
    <v-alert
        dense
        text
        type="success"
    >
      Cursos totales: {{ getInfo.totalCursos }}
    </v-alert>

  </div>

</template>


<script>
import {mapGetters} from "vuex";

export default {
  name: "InfoDetalle",
  computed: {
    ...mapGetters(["getInfo"]),
  },
};
</script>

