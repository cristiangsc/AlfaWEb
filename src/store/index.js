import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase.js'
import {collection, getDocs, deleteDoc, doc, addDoc} from "firebase/firestore"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cursos: []
    },
    getters: {
        getInfo(state) {
            return {
                cupos: state.cursos
                    .map((course) => course.cupos)
                    .reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0),
                inscritos: state.cursos
                    .map((course) => course.inscritos)
                    .reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0),
                disponibles: state.cursos
                        .map((course) => course.cupos)
                        .reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0) -
                    state.cursos
                        .map((course) => course.inscritos)
                        .reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0),
                terminados: state.cursos.filter((course) => course.terminado).length,
                activos: state.cursos.filter((course) => !course.terminado).length,
                totalCursos: state.cursos.length,
            };
        },
    },
    mutations: {
        ADD_CURSO(state, cursos) {
            state.cursos.push({
                id: cursos.id,
                codigo: cursos.data().codigo,
                costo: parseInt(cursos.data().costo),
                cupos: cursos.data().cupos,
                descripcion: cursos.data().descripcion,
                duracion: cursos.data().duracion,
                fecha: cursos.data().fecha,
                inscritos: cursos.data().inscritos,
                nombre: cursos.data().nombre,
                terminado: cursos.data().terminado,
                url: cursos.data().url,
            })
        },

        RESET_CURSO(state) {
            state.cursos = []
        },
        DELETE_COURSE(state, payload) {
            state.cursos = state.cursos.filter((course) => course.id !== payload);
        },
    },
    actions: {
        async fetchCursos({commit}) {
            let querySnapShot = await getDocs(collection(db, 'cursos'))
            commit('RESET_CURSO')
            querySnapShot.forEach((doc) => {
                commit('ADD_CURSO', doc)
            })
        },
        async deleteCurso({ commit }, payload) {
            await deleteDoc(doc(db, "cursos", payload));
            commit("DELETE_COURSE", payload);
            alert("Curso eliminado con éxito");
        },

        async addCourse({ commit }, payload) {
            try {
                const response = await addDoc(collection(db, "cursos"), payload);
                alert("Curso creado con éxito");
            } catch (error) {
                console.log(error);
            }
        },
    },
    modules: {}
})


