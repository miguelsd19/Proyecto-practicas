<template>
  <div id="app">
    <v-app id="inspire">
      <v-container class="contenedor">

        <br/>
      <v-row >
      <v-col
        cols="6"
        align="center"
        
      > 
        <v-btn block x-large outlined @click="MovetoClients">
        <h3 >Ver clientes</h3>
        </v-btn>
      </v-col>
      <v-col
        cols="6"
        align="center"
      >
      <v-btn block x-large outlined :class="{ExpedientsActive:expedientesColor }">
        <h3>Ver Expedientes</h3>
        </v-btn>
        
      </v-col>
    </v-row>
    <br/>
    <br/>

        <div class="buscador">
          <v-row justify="center">
            <v-col cols="7">
              <v-text-field
                class="text-center mb-5"
                outlined
                v-model="buscar"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-select
                label="Filtrar por Columna"
                :items="listaColumnas"
                v-model="categoria"
              ></v-select>
            </v-col>
          </v-row>
        </div>

        <v-data-table
          :headers="headers"
          :items="filtroColumna"
          :search="metodoBusqueda"
          :footer-props="{
            itemsPerPageOptions: [5, 10, 15, -1],
            itemsPerPageText: 'Datos por página:',
          }"
          item-key="_id"
          no-results-text="No se han encotrado resultados."
          no-data-text="No se han encotrado resultados."
          class="elevation-5"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn v-if="item.status === true" outlined small @click="edit(item)"> Editar </v-btn>
          </template>
          <template v-slot:item.date="{ item }">
            {{ item.date.substr(0, 10) }}
          </template>
          <template v-slot:item.status="{ item }">
            {{ expStatus(item.status) }}
          </template>
        </v-data-table>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      buscar: "",
      categoria: "todas",
      listaColumnas: [
        { text: "Todas las Columnas", value: "todas" },
        { text: "ID", value: "id_generated" },
        { text: "Fecha", value: "date" },
        { text: "Cliente", value: "client.name" },
        { text: "Proyectista", value: "projectist.name" },
        { text: "Catálogo", value: "catalog_formalities.name" },
        { text: "Status", value: "status" },
      ],
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id_generated",
        },
        { text: "Fecha", value: "date" },
        { text: "Cliente", value: "client.name" },
        { text: "Proyectista", value: "projectist.name" },
        { text: "Catálogo", value: "catalog_formalities.name" },
        { text: "Status", value: "status" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions("Expedientes", ["getExpedientes"]),
    ...mapMutations("header",["setExpedientesOn"]),
    ...mapMutations("Datos",["setAccesoDinamico"]),
    MovetoClients(){
      this.$router.push({
        name: "ClientesLista",
      });
    },
    expStatus(el) {
      if (el === true) {
        return "Abierto";
      } else {
        return "Cerrado";
      }
    },
    edit(item){
      this.setAccesoDinamico(true);
      this.$router.push({
        name: "ExpedientesEditar",
        params: {
          editItem: item
        }
      });
    }
  },
  computed: {
    ...mapState("header", ["expedientesColor"]),
    ...mapState("Expedientes", ["expedientes"]),
    metodoBusqueda() {
      if (this.categoria === "todas") {
        return this.buscar;
      }
      return null;
    },
    filtroColumna() {
      if (this.categoria !== "todas") {
        return this.expedientes.filter((element) => {
          if (element[this.categoria] === undefined) {
            let categoria = this.categoria.split(["."]);
            return element[categoria[0]][categoria[1]]
              .toString()
              .toUpperCase()
              .includes(this.buscar.toUpperCase());
          }
          return element[this.categoria]
            .toString()
            .toUpperCase()
            .includes(this.buscar.toUpperCase());
        });
      }
      return this.expedientes;
    },
  },
  created() {
    this.getExpedientes();
    this.setExpedientesOn()
  }
};
</script>

<style scoped>
.ExpedientsActive {
  background-color: #827655;
  color:azure 
  
}
.buscador {
  max-width: 1000px;
  margin: 0 auto;
}
</style>