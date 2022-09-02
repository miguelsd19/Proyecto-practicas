<template>
  <div id="app">
    <v-app id="inspire" class="fondo-gris">
      <v-container class="contenedor grey--text text--darken-3 elevation-10 linea-gris pa-10 pt-16">
        <div class="header d-flex flex-column text-center">
          <div>
            <h3 class="title">Crea el expediente nuevo para el cliente: </h3>
            <h2 class="subtitle-1">{{ nombre }}</h2>
          </div>
          <p class="subtitle-1 align-self-end">{{ fecha }}</p>
        </div>
        <div class="seccion-selecciona">
          <div class="selecciona">
            <p class="title">Selecciona el catálogo de tramites</p>
            <v-select
              class="selector"
              label="Catálogo de tramites"
              v-model="catalogo"
              :items="selectCatalogos"
            ></v-select>
          </div>
          <div class="selecciona">
            <p class="title">Selecciona el proyectista</p>
            <v-select
              class="selector"
              label="Proyectistas"
              v-model="proyectista"
              :items="selectProyectistas"
            ></v-select>
          </div>
        </div>
        <div class="d-flex flex-column text-center">
          <p class="title">Este sera el numero del expediente a crear:</p>
          <h3 class="subtitle-1">{{ noExpediente }}</h3>
        </div>
        <div class="acciones">
          <v-btn
            @click="crearExpediente"
            x-large
            dark
            class="elevation-2"
            color="clientes2"
          >
            Continuar
            <v-icon class="ml-2">mdi-note-plus</v-icon>
          </v-btn>
        </div>
        <v-snackbar
          v-model="snackbar"
          centered
          color="red"
          :multi-line="true"
          :timeout="4000"
        >
          <v-layout align-center pr-4>
            <v-icon class="pr-3" dark large>mdi-alert-circle</v-icon>
            <v-layout column>
              <div>
                <strong>Error!</strong>
              </div>
              <div>Algo salió mal, por favor inténtelo nuevamente seleccionando alguna opcion de ambas categorias.</div>
            </v-layout>
          </v-layout>
        </v-snackbar>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Swal from "sweetalert2";
export default {
  props: ["cliente"],
  data() {
    return {
      nombre: null,
      fecha: new Date().toISOString().substr(0, 10),
      noExpediente: null,
      catalogo: "",
      proyectista: "",
      snackbar: false,
    };
  },
  computed: {
    ...mapState("Datos", ["catalogos", "proyectistas"]),
    selectCatalogos() {
      let catalogos = this.catalogos.map((el) => {
        return { text: el.name, value: el._id };
      });
      return catalogos;
    },
    selectProyectistas() {
      let proyectistas = this.proyectistas.map((el) => {
        return { text: el.name, value: el._id };
      });
      return proyectistas;
    },
  },
  methods: {
    ...mapActions("Datos", ["getCatalogos", "getProyectistas"]),
    ...mapMutations("Datos", ["setAccesoDinamico"]),
    ...mapActions("Expedientes", [
      "registerExpediente",
      "getExpedientes",
      "getNumeroExpediente",
    ]),
    crearExpediente() {
      this.setAccesoDinamico(true);
      let exp = {
        year_proceeding: this.fecha.substr(0, 4),
        client: this.cliente._id,
        projectist: this.proyectista,
        catalog_formalities: this.catalogo,
        date: this.fecha,
        scripture: 105,
      };
      this.registerExpediente(exp)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Listo!",
              text: "Se ha registrado el expediente.",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getExpedientes().then((response2) => {
              if (response2.length > 0) {
                let expedienteCreado = response2.filter(
                  (el) => el._id === response.data._id
                );
                this.$router.push({
                  name: "ExpedientesEditar",
                  params: {
                    editItem: expedienteCreado[0],
                  },
                });
              }
            });
          }
        })
        .catch((err) => {
          this.snackbar = true;
          console.log(err);
        });
    },
  },

  created() {
    if (this.cliente === undefined) {
      this.$router.push("/ClientesLista");
    } else {
      this.nombre = this.cliente.name;
      this.getCatalogos();
      this.getProyectistas();
      this.getNumeroExpediente()
        .then((res) => (this.noExpediente = res.data))
        .catch((err) => {
          this.snackbar = true;
          console.log(err);
        });
    }
  },
};
</script>


<style scoped>
.seccion-selecciona {
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto;
}
.selecciona {
  max-width: 250px;
}
.acciones {
  padding-top: 5rem;
  display: flex;
  justify-content: center;
}
</style>
