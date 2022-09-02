import axios from "axios";

export default {
    namespaced: true,
    state: {
        accesoDinamico: false,
        catalogos: [],
        proyectistas: [],
        ingresos: [],
        pagosEspeciales: [],
        cuentas: [],
        conceptos: [],
        conceptosName: []
    },
    getters: {
        accesoDinamico(state) {
            return state.accesoDinamico;
        }
    },
    mutations: {
        setAccesoDinamico(state, payload) {
            state.accesoDinamico = payload;
        },
        setCatalogos(state, payload) {
            state.catalogos = payload;
        },
        setProyectistas(state, payload) {
            state.proyectistas = payload;
        },
        setIngresos(state, payload) {
            state.ingresos = payload;
        },
        setPagosEspeciales(state, payload) {
            state.pagosEspeciales = payload;
        },
        setCuentas(state, payload) {
            state.cuentas = payload;
        },
        setConceptos(state, payload) {
            state.conceptos = payload;
        }
    },
    actions: {
        async getCatalogos({ commit }) {
            let res = await axios.get("api/formalities/").then(response => response)
                .catch((err) => {
                    console.log(err);
                });
            commit('setCatalogos', res.data);
        },
        async getProyectistas({ commit }) {
            let res = await axios.get("api/projectist/").then(response => response)
                .catch((err) => {
                    console.log(err);
                });
            commit('setProyectistas', res.data);
        },
        async getIngresos({ commit }) {
            let res = await axios.get("api/incomes/").then(response => response)
                .catch((err) => {
                    console.log(err);
                });
            await commit('setIngresos', res.data);
            return res;
        },
        async getPagosEspeciales({ commit }) {
            let res = await axios.get("api/special-payment/").then(response => response)
                .catch((err) => {
                    console.log(err);
                });
            await commit('setPagosEspeciales', res.data);
            return res;
        },
        async getCuentas({ commit }) {
            let res = await axios.get("/api/account/").then(response => response)
                .catch((err) => {
                    console.log(err);
                });
            commit('setCuentas', res.data);
        },
        async getConceptos({ commit, state }) {
            if (state.conceptos.length === 0) {
                let res = await axios.get("/api/concepts/").then(response => response.data)
                    .catch((err) => {
                        console.log(err);
                    });
                commit('setConceptos', res);

                for (var i = 0; i < res.length; i++) {
                    state.conceptosName.push(res[i].name)
                }
                //console.log(state.conceptosName);
            }
        }
    }
}