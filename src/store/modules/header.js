export default {
    namespaced: true,
    state: {
       expedientesColor:"",
       clientesColor:""
    },
    mutations: {
       setExpedientesOn(state){
        state.expedientesColor = true;
        state.clientesColor=false;
       },
       setClientesOn(state){
        state.clientesColor = true;
        state.expedientesColor=false;
       }
    },

    actions: {
    }   
}