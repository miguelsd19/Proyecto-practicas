import axios from "axios";
import Swal from "sweetalert2";


export default {
    namespaced: true,
    state: {
        clientes: [],
    },
    getters: {
        clientes(state) {
            return state.clientes;
        }
    },
    mutations: {
        addCliente(state, payload) {
            state.clientes.push(payload);
        },
        getClientes(state, payload) {
            state.clientes = payload;
        },
        editCliente(state, payload) {
            state.clientes[payload.index] = payload.data;
        }
    },
    actions: {
        async addCliente(state, payload) {
            await axios.post('/api/clients/', payload).then(data => {
                state.commit('addCliente', data.data);
                return data;
            }).catch(err => {
                console.log(err.response)
                Swal.fire({
                    icon: "error",
                    title: "Algo salio mal!",
                    text: err.response.data,
                    showConfirmButton: false,
                    timer: 2500,
                  });
                  console.log(err)
                });
        },
        async getClientes(state) {
            await axios.get('/api/clients').then(data => {
                state.commit('getClientes', data.data);
            }).catch(arr => console.log(arr));
        },
        async changeClStatus(state, payload) {
            var temp = {
                status: payload.status,
            }
            await axios.put('/api/clients/' + payload.id, temp).catch(err => console.log(err));
        },
        async editCliente(state, payload) {
            var temp = {}
            var temp2 = {}
            if (payload.phone_2.length == 0 || payload.phone_2 === undefined) {
                temp = {
                    name: payload.name,
                    rfc: payload.rfc,
                    curp: payload.curp,
                    phone_1: payload.phone_1,
                    /* phone_2: payload.tel2, */
                    adress: {
                        street: payload.adress.street,
                        number: payload.adress.number,
                        colony: payload.adress.colony,
                        postal_code: payload.adress.postal_code,
                        city: payload.adress.city,
                        municipality: payload.adress.municipality,
                    },
                }
                temp2 = {
                    index: payload.index,
                    data: {
                        _id: payload.id,
                        name: payload.name,
                        rfc: payload.rfc,
                        curp: payload.curp,
                        phone_1: payload.phone_1,
                        status: payload.status,
                        /* phone_2: payload.tel2, */
                        adress: {
                            street: payload.adress.street,
                            number: payload.adress.number,
                            colony: payload.adress.colony,
                            postal_code: payload.adress.postal_code,
                            city: payload.adress.city,
                            municipality: payload.adress.municipality,
                        },
                    }
                }
            } else {
                temp = {
                    name: payload.name,
                    rfc: payload.rfc,
                    curp: payload.curp,
                    phone_1: payload.phone_1,
                    phone_2: payload.phone_2,
                    adress: {
                        street: payload.adress.street,
                        number: payload.adress.number,
                        colony: payload.adress.colony,
                        postal_code: payload.adress.postal_code,
                        city: payload.adress.city,
                        municipality: payload.adress.municipality,
                    },
                }
                temp2 = {
                    index: payload.index,
                    data: {
                        _id: payload.id,
                        name: payload.name,
                        rfc: payload.rfc,
                        curp: payload.curp,
                        phone_1: payload.phone_1,
                        phone_2: payload.phone_2,
                        status: payload.status,
                        adress: {
                            street: payload.adress.street,
                            number: payload.adress.number,
                            colony: payload.adress.colony,
                            postal_code: payload.adress.postal_code,
                            city: payload.adress.city,
                            municipality: payload.adress.municipality,
                        },
                    }
                }
            }
            let res = await axios.put('/api/clients/' + payload.id, temp).then(
                resp => {
                    state.commit('editCliente', temp2);
                    return resp
                }
            ).catch(err => console.log(err));
            return res;
        }
    },
}