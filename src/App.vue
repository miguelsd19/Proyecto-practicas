<template>
  <v-app>
    <the-header v-if="this.$store.getters.auth === true"></the-header>
    <the-login v-if="this.$store.getters.auth === false"></the-login>
    <v-app v-else>
      <router-view></router-view>
    </v-app>
    <TheFooter></TheFooter>
  </v-app>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheLogin from "./components/paginas/auth/TheLogin.vue";
import TheFooter from './components/layout/TheFooter.vue'
import axios from "axios";

export default {
  components: {
    TheHeader,
    TheLogin,
    TheFooter
  },
  computed: {
    currentUser() {
      return this.$store.getters["currentUser"];
    },
  },
  created() {
    axios.defaults.baseURL = "https://notaria46.herokuapp.com/";
    if (this.$store.getters.auth === false) {
      if (this.$route.path !== "/" && this.$route.path !== "/home") {
        this.$router.replace("/");
      }
    }
  },
};
</script>

<style>
body {
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
}
/* .sombra {
  box-shadow: 0 9px 0px 0px white, 0 -9px 0px 0px white, 12px 0 15px -4px #d3d3d3, -12px 0 15px -4px #d3d3d3;
} */
.contenedor {
  background-color: white;
  max-width: 60%;
  height: 100%;
  margin: 0 auto;
}
.fondo-gris {
  background-color: #ededed!important;
}
a {
  text-decoration: none;
}
</style>