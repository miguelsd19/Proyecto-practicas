import axios from "axios";
export default {
    namespaced: true,
    state: {
        expedientes: [],
        expedientesName: [],
        expedientesID: []
    },
    mutations: {
        setExpedientes(state, payload) {
            state.expedientes = payload;
        }
    },
    actions: {
        async getExpedientes({ commit, state }) {
            let res = await axios.get("api/proceedings/").then(response => response.data)
                .catch((err) => {
                    console.log(err);
                });
            commit('setExpedientes', res);
            for (var i = 0; i < res.length; i++) {
                state.expedientesName.push(res[i].client.name)
                state.expedientesID.push(res[i].id_generated)
            }
            return res;
        },
        editExpedienteStatus(_, exp) {
            const res = axios.put(`api/proceedings/${exp._id}`, { status: exp.status }).then(response => response)
                .catch((err) => {
                    console.log(err);
                });
            return res;
        },
        async registerExpediente({ dispatch }, exp) {
            const res = await axios.post("api/proceedings/registro", exp).then(response => response)
                .catch(err => {
                    console.log(err);
                });
            dispatch('getExpedientes');
            return res;
        },
        async addIngreso(_, ing) {
            const res = await axios.post(`api/incomes/proceeding/${ing.expId}`, ing.data).then(response => response)
                .catch(err => {
                    console.log(err);
                });
            return res;
        },
        async addPagoEspecial(_, pago) {
            const res = await axios.post(`api/special-payment/proceeding/${pago.expId}`, pago.data).then(response => response).catch(err => {
                console.log(err);
            });
            return res;
        },
        async getNumeroExpediente() {
            const res = await axios.get("api/proceedings/registro").then(response => response).catch((err) => {
                console.log(err);
            });
            return res;
        }
    }
}