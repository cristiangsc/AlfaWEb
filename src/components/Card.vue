<template>
  <v-container>
    <v-row justify="space-around">
      <v-col
          cols="12"
          md="6"
          lg="4"
          xl="3"
          v-for="curso in cursos"
          :key="curso.id"
          class="d-flex"
      >
        <v-card width="400"
                class="mb-4"
        >
          <v-img
              height="200px"
              :src="curso.url"
          >

          </v-img>

          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              {{ curso.nombre }}
            </div>
          </v-card-text>

          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              Información
            </div>


            <v-timeline
                align-top
                dense
            >
              <v-timeline-item
                  color="deep-purple lighten-1"
                  small
              >
                <div>
                  <div class="font-weight-normal">
                    Costo: <strong> $ {{ (curso.costo).toLocaleString("es-CL") }}</strong>
                  </div>
                  <div>Duración: {{ curso.duracion }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                  color="green"
                  small
              >
                <div>
                  <div class="font-weight-normal">
                    Cupos: <strong>{{ curso.cupos }}</strong>
                  </div>
                  <div>Completado: {{ curso.terminado ? 'SI' : 'NO' }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                  color="deep-purple lighten-1"
                  small
              >
                <div>
                  <div class="font-weight-normal">
                    Fecha de Registro:
                  </div>
                  <div>
                    <date-display :date='curso.fecha.toDate()'/>
                  </div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                  color="green"
                  small
              >
                <div>
                  <div class="font-weight-normal">
                    Descripción:
                  </div>
                  <div>{{ curso.descripcion }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import {mapActions, mapState} from "vuex";
import DateDisplay from "@/components/DateDisplay";

export default {
  components: {
    'date-display': DateDisplay
  },
  created() {
    this.fetchCursos()
  },
  computed: {
    ...mapState(["cursos"]),
  },
  methods: {
    ...mapActions(['fetchCursos']),
  }
}
</script>