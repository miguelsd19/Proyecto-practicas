import axios from "axios";

export default {
    namespaced: true,
    state: {
        proceedings: [],
        policy: [],
        currentPolicy: [], //aqui se guarda el egresos ver
        policyID: "",
        tableData: [],
        PolicyToSend: []
    },
    mutations: {
        setproceedings(state, payload) {
            state.proceedings = payload;
        },
        setpolicy(state, payload) {
            state.policy = payload;
        },
        setCurrentPolicy(state, payload) {
            state.currentPolicy = payload;
        },
        setpolicyID(state, payload) {
            state.policyID = payload;
        },
        clearPolicy(state) {
            state.PolicyToSend = [];
            state.tableData = [];
        }
    },

    actions: {
        async clearPolicyData({ commit }) {
            await commit('clearPolicy');
        },

        async getPolicy({ commit }) {
            try {
                const res = await axios.get("api/policy");
                commit('setpolicy', res.data);
            } catch (error) {
                console.error(error)
            }
        },

        async getCurrentPolicy({ commit }, payload) {
            try {
                const res = await axios.get("api/policy/" + payload);
                commit('setCurrentPolicy', res.data);

            } catch (error) {
                console.error(error)
            }
        },

        addoutcome({ state }, payload) {
            let dataToSend = {
                proceedings: payload.proceedings,
                outcome_concept: payload.outcome_concept,
                outcome_amount: payload.outcome_amount
            }
            state.PolicyToSend.push(dataToSend)

        },

        addTableData({ state }, payload) {
            state.tableData.push(payload)
        },


        async SendPolicyOutcomes(_, payload) {
            let dataToSend = {
                policy_concept: payload.policy_concept,
                outcome: payload.outcome
            }

            return axios.post("api/policy", dataToSend).then(response => response)

        },

        async getproceedings({ commit }) {
            const res = await axios.get("api/outcomes/").then(response => response)
                .catch((err) => {
                    this.ErrorText =
                        "Algo salio mal.";
                    alert(err);
                });
            await commit('setproceedings', res.data);
            return res;
        },

    }
}