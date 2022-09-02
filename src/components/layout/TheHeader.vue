<template>
  <v-container>
    <v-app-bar app color="#021b40" dark>
      <v-row>
        <v-col cols="3">
          <div v-if="checkPaginaPrincipal">
            <v-btn v-if="checkPagina" dark color="#4e626b" @click="volver()">
              <v-icon class="mr-2"> mdi-undo-variant </v-icon>
              Volver
            </v-btn>
            <v-btn v-else dark color="#4e626b" @click="volverMenu()">
              <v-icon class="mr-2"> mdi-undo-variant </v-icon>
              Menú Principal
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <center>
            <v-card color="#021b40" flat dark>
              <h2>Notaria 46</h2>
            </v-card>
          </center>
        </v-col>
        <v-col cols="3" align="right">
          <v-btn dark color="#37474F" @click="logout">
            <v-icon class="mr-2"> mdi-logout-variant </v-icon>
            Cerrar Sesión
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-row v-if="headerVisibility">
      <v-col cols="6" @click="VClients" align="center">
        <h3>Ver clientes</h3>
      </v-col>
      <v-col cols="6" class="butons" @click="VExp" align="center">
        <h3>Ver Expedientes</h3>
      </v-col>
    </v-row>
    <v-row v-if="headerEgresos">
      <v-col cols="12" align="center">
        <h3>Polizas de egresos</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      verClientes: false,
      verExpedientes: false,
      // egresos:false // false muestra el header ver clientes/ ver expedientes, true muestra ver clientes
    };
  },
  computed: {
    ...mapState("header", ["expedientes", "clientes"]),
    checkPagina() {
      let ruta = this.$route.name;
      if (
        ruta === "ClientesEditar" ||
        ruta === "EgresosRegistro" ||
        ruta === "ExpedientesRegistro" ||
        ruta === "ExpedientesEditar" ||
        ruta === "ClientesRegistro" ||
        ruta === "EgresosVer"
      ) {
        return true;
      }
      return false;
    },
    checkPaginaPrincipal() {
      let ruta = this.$route.path;
      if (ruta === "/" || ruta === "/home") {
        return false;
      }
      return true;
    },
    headerVisibility() {
      let ruta = this.$route.name;
      if (
        ruta === "menu-principal" ||
        ruta === "login" ||
        ruta === "EgresosLista" ||
        ruta === "EgresosRegistro" ||
        ruta === "EgresosVer"
      ) {
        return false;
      }
      return true;
    },
    headerEgresos() {
      let ruta = this.$route.name;
      if (
        ruta === "EgresosLista" ||
        ruta === "EgresosRegistro" ||
        ruta === "EgresosVer"
      ) {
        return true;
      }
      return false;
    },
  },

  methods: {
    ...mapMutations(["setCurrentUser", "setToken", "setLogin"]),
    ...mapMutations("header", ["setExpedientesOn", "setClientesOn"]),
    volver() {
      let historialInicial = this.$store.getters["historial"];
      if (historialInicial.length !== 1) {
        let hist = this.$store.getters["historial"];
        if (hist.length >= 1) {
          if (this.$route.path === "/ExpedientesEditar") {
            this.$router.push(hist[hist.length - 1]);
          } else if (this.$route.path === "/ExpedientesRegistro") {
            this.$router.push(hist[hist.length - 1]);
          } else if (this.$route.path === "/ClientesEditar") {
            this.$router.push(hist[hist.length - 1]);
          } else if (this.$route.path === "/ClientesRegistro") {
            this.$router.push(hist[hist.length - 1]);
          }
          else {
            this.$router.push(hist[hist.length - 2]);
            this.$store.commit("subHistorial");
            this.$store.commit("subHistorial");
          }
        }
      }
    },
    volverMenu(){
      let ruta = this.$route.path;
      if (ruta !== '/' && ruta !== '/home') {
        this.$router.push('/home');
        this.$store.commit("restartHistorial");
      }
    },
    logout() {
      this.setCurrentUser(null);
      this.setToken(null);
      this.setLogin(false);
    },
    print() {
      console.log("funciona");
    },
    VExp() {
      if (this.$route.name !== "ExpedientesLista") {
        this.setExpedientesOn();
        this.$router.replace("ExpedientesLista");
      }
    },
    VClients() {
      if (this.$route.name !== "ClientesLista") {
        this.setClientesOn();
        this.$router.replace("ClientesLista");
      }
    },
  },
};
</script>

<style>
.btn-volver {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
}
.headera {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-block-start-style: groove;
  border-bottom-style: groove;
  border-bottom-color: black;
  border-inline-start-style: groove;
  border-inline-end-style: groove;
  border-inline-end-color: black;
  border-block-start-color: black;
  border-inline-start-color: black;
}
.butons {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-bottom-style: groove;
  border-bottom-color: black;
  border-inline-start-style: groove;
  border-inline-end-style: groove;
  border-inline-end-color: black;
  border-block-start-color: black;
  border-inline-start-color: black;
}
.ClientActive {
  background-color: #a5d3ae;
}
.ExpActive {
  background-color: salmon;
}
.egresosStyle {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-bottom-style: groove;
  border-bottom-color: black;
  border-inline-start-style: groove;
  border-inline-end-style: groove;
  border-inline-end-color: black;
  border-block-start-color: black;
  border-inline-start-color: black;
}
</style>