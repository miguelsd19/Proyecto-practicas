import Vue from 'vue';
import Vuex from 'vuex';
import rules from './modules/rules';
import Expedientes from './modules/Expedientes';
import Clientes from './modules/Clientes';
import Egresos from './modules/Egresos'
import Datos from './modules/Datos';
import header from './modules/header'
//import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        historial: [],
        login: false,
        currentUser: null,
        token: null,
    },
    getters: {
        historial(state) {
            return state.historial;
        },
        currentUser(state) {
            return state.currentUser;
        },
        token(state) {
            return state.token;
        },
        auth(state) {
            return state.login
        }
    },
    mutations: {
        addHistorial(state, payload) {
            state.historial.push(payload);
        },
        subHistorial(state) {
            state.historial.pop();
        },
        restartHistorial(state) {
            state.historial = ["/home"];
        },
        spliceHistorial(state, payload) {
            state.historial.splice(payload, 1);
        },
        setCurrentUser(state, payload) {
            state.currentUser = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        setLogin(state, payload) {
            state.login = payload;
        }
    },
    actions: {},
    modules: {
        rules,
        Expedientes,
        Clientes,
        Egresos,
        Datos,
        header
    }
});