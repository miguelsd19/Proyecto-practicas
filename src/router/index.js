import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import ClientesLista from '../components/paginas/clientes/ClientesLista.vue';
import ClientesEditar from '../components/paginas/clientes/ClientesEditar.vue';
import ClientesRegistro from '../components/paginas/clientes/ClientesRegistro.vue';
import EgresosLista from '../components/paginas/egresos/EgresosLista.vue';
import EgresosRegistro from '../components/paginas/egresos/EgresosRegistro.vue';
import EgresosVer from '../components/paginas/egresos/EgresosVer.vue';
import ExpedientesEditar from '../components/paginas/expedientes/ExpedientesEditar.vue';
import ExpedientesLista from '../components/paginas/expedientes/ExpedientesLista.vue';
import ExpedientesRegistro from '../components/paginas/expedientes/ExpedientesRegistro.vue';
import MenuPrincipal from '../components/paginas/MenuPrincipal.vue';


Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        name: 'menu-principal',
        component: MenuPrincipal
    },
    {
        path: '/ClientesLista',
        name: 'ClientesLista',
        component: ClientesLista
    },
    {
        path: '/ClientesEditar',
        name: 'ClientesEditar',
        component: ClientesEditar,
        props: true,
    },
    {
        path: '/ClientesRegistro',
        name: 'ClientesRegistro',
        component: ClientesRegistro
    },
    {
        path: '/EgresosLista',
        name: 'EgresosLista',
        component: EgresosLista
    },
    {
        path: '/EgresosRegistro',
        name: 'EgresosRegistro',
        component: EgresosRegistro,
        props: true
    },
    {
        path: '/EgresosVer',
        name: 'EgresosVer',
        component: EgresosVer,
        props: true
    },
    {
        path: '/ExpedientesEditar',
        name: 'ExpedientesEditar',
        component: ExpedientesEditar,
        props: true
    },
    {
        path: '/ExpedientesLista',
        name: 'ExpedientesLista',
        component: ExpedientesLista
    },
    {
        path: '/ExpedientesRegistro',
        name: 'ExpedientesRegistro',
        component: ExpedientesRegistro,
        props: true
    },
    { path: '/:paginaNoEncontrada(.*)', redirect: '/home' }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    let hist = store.state.historial;
    if (to.path !== "/ExpedientesRegistro" && from.path !== "/ExpedientesRegistro" && to.path !== "/ClientesEditar" && from.path !== "/ClientesEditar" && to.path !== "/ExpedientesEditar" && to.path !== "/ClientesRegistro" && from.path !== "/ClientesRegistro" && to.path !== hist[hist.length - 1]) {
        store.commit('addHistorial', to.path);
    }
    //verifica que entre a Expedientes Editar de forma correcta 
    if (to.path === "/ExpedientesEditar") {
        if (!store.getters['Datos/accesoDinamico']) {
            return false;
        }
    }
    if (to.path === "/" || to.path === "/home") {
        store.commit("restartHistorial");
    }
    next();
});

export default router;