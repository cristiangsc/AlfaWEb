<template>
  <div class="container">
    <v-data-table
        :headers="headers"
        :items="this.cursos"
        sort-by="nombre"
        class="elevation-1"
    >
      <template v-slot:item.costo="{ item }">
        <v-chip
            color="green"
            dark
        >
          {{ item.costo }}
        </v-chip>
      </template>

      <template v-slot:item.fecha="{ value }">
        <v-chip
            color="green"
            dark
        >
          <date-display :date='value.toDate()'/>
        </v-chip>
      </template>

      <template v-slot:item.terminado="{ item }">
        <v-chip
            :color=getColor(item.terminado)
            dark
        >
          {{ item.terminado ? 'SI' : 'NO' }}
        </v-chip>
      </template>


      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>ADMINISTRACIÓN DE CURSOS</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="700px"
          >
            <!-- boton agregar CURSOS-->
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >
                AGREGAR CURSO
              </v-btn>
            </template>
            <!--fin boton agregar CURSO-->

            <!--form-card agregar/editar CURSO-->
            <v-form v-model="valid" ref="form">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.nombre"
                            label="Nombre"
                            counter
                            minlength="4"
                            :rules="[rules.required]"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.url"
                            label="URL de la Imagen del curso"
                            counter
                            minlength="4"
                            :rules="[rules.required]"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.cupos"
                            label="Cupos del curso"
                            :rules="[rules.required]"
                            type="number"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.inscritos"
                            label="Inscritos en el curso"
                            :rules="[rules.required]"
                            type="number"
                            required
                        ></v-text-field>
                      </v-col>

                      <v-alert
                          v-if="Number(editedItem.inscritos) > Number(editedItem.cupos)"
                          dense
                          type="warning"
                      >
                        Número de inscritos no puede superar al número de cupos
                      </v-alert>
                      <span v-else></span>

                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.duracion"
                            label="Duración del curso"
                            counter
                            minlength="4"
                            :rules="[rules.required]"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.costo"
                            label="Costo del curso"
                            :rules="[rules.required]"
                            type="number"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.codigo"
                            label="Código del curso"
                            counter
                            minlength="4"
                            :rules="[rules.required]"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="8"
                      >
                        <v-textarea
                            v-model="editedItem.descripcion"
                            label="Descripción del curso"
                             name="input-7-4"
                            counter
                            minlength="4"
                            :rules="[rules.required]"
                            hint="La descripción es importante"
                            required
                        ></v-textarea>
                      </v-col>

                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            :value="formatFecha(editedItem.fecha)"
                            label="Fecha de registro"
                            disabled
                        ></v-text-field>
                      </v-col>

                      <v-col>
                        <v-switch
                            v-model="editedItem.terminado"
                            :label="`Terminado: ${editedItem.terminado ? 'SI' : 'NO'}`"
                            color="info"
                            value="info"
                            hide-details
                        ></v-switch>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
            <!--fin form-card agregar/editar usuarios-->

          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">¿Está seguro de eliminar este registro?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
            color="primary"
        >
          No hay registro que mostrar
        </v-btn>
      </template>
    </v-data-table>

    <info-detalle/>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {db} from '@/firebase/firebase.js'
import {doc, updateDoc} from 'firebase/firestore'
import dateDisplay from "@/components/DateDisplay";
import InfoDetalle from "@/components/InfoDetalle";

export default {
  components: {
    'date-display': dateDisplay,
    'info-detalle': InfoDetalle
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    valid: true,
    fechaHoy: new Date(),
    rules: {required: value => !!value || 'Este campo es requerido.'},
    headers: [
      {
        text: 'Curso',
        align: 'center',
        sortable: true,
        value: 'nombre',
      },
      {text: 'Cupos', value: 'cupos'},
      {text: 'Inscritos', value: 'inscritos'},
      {text: 'Duración', value: 'duracion'},
      {text: 'Costo', value: 'costo'},
      {text: 'Terminado', value: 'terminado'},
      {text: 'Fecha', value: 'fecha'},
      {text: 'Acciones', value: 'actions', sortable: false},
    ],

    editedIndex: -1,
    editedItem: {
      codigo: '',
      costo: 0,
      cupos: 0,
      descripcion: '',
      duracion: '',
      fecha: '',
      inscritos: 0,
      nombre: '',
      terminado: false,
      url: ''
    },
    defaultItem: {
      codigo: '',
      costo: 0,
      cupos: 0,
      descripcion: '',
      duracion: '',
      fecha: '',
      inscritos: 0,
      nombre: '',
      terminado: false,
      url: ''
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Registrar Curso' : 'Editar Curso'
    },

    ...mapState(['cursos'])
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.fetchCursos()
  },

  methods: {
      ...mapActions(['fetchCursos', 'deleteCurso', 'addCourse']),
    getColor(terminado) {
      if (terminado) return 'blue'
      else return 'gray'
    },

    editItem(item) {
      this.editedIndex = this.cursos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.cursos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteCurso(this.editedItem.id)
      this.cursos.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      this.$refs.form.validate()//validar campos
      if (!this.valid) return //no es valido y funcion se cierra
      console.log(this.editedItem.inscritos, "--", this.editedItem.cupos)
      if (Number.parseInt(this.editedItem.inscritos) <= Number.parseInt(this.editedItem.cupos)) {
        if (this.editedIndex > -1) {
          try {
            await updateDoc(doc(db, 'cursos', this.editedItem.id), this.editedItem)
          } catch (error) {
            console.log(error)
          }
        } else {
          this.editedItem.fecha = this.fechaHoy
          await this.addCourse(this.editedItem)
        }
        await this.fetchCursos()
        this.$refs.form.reset()
        this.close()
      }else{
        alert("Cantidad de inscrito no puede ser superior a la cantidad de cupos")
      }
    },
    formatFecha(itemFecha){
        const fecha = this.fechaHoy
      const fechaAddCurso = fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()
          if (itemFecha) {
          const date = itemFecha.toDate()
            return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        }
        return fechaAddCurso
    }
  }
}
</script>