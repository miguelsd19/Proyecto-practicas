<template>
  <div id="app">
    <v-app id="inspire">
      <v-container class="contenedor">
        <br />
        <v-row>
          <v-col cols="12" align="center">
            <h2>Pólizas de egresos</h2>
          </v-col>
        </v-row>
        <br />
        <br />
        <template class="buscador">
          <v-row justify="center">
            <v-col cols="5">
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
            <v-col cols="3">
              <v-select
                label="Filtrar por Columna"
                :items="listaColumnas"
                v-model="categoria"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-btn
                class="elevation-2"
                x-large
                depressed
                dark
                color="#7b4849"
                to="/EgresosRegistro"
              >
                Crear nueva póliza
                <v-icon class="ml-2">mdi-file-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>

        <v-data-table
          :headers="headers"
          :items="filtroColumna"
          :search="metodoBusqueda"
          class="elevation-5"
          no-results-text="No se han encotrado resultados."
          no-data-text="No se han encotrado resultados."
          :footer-props="{
            itemsPerPageOptions: [5, 10, 15, -1],
            itemsPerPageText: 'Datos por página:',
            itemsPerPageAllText: 'Todos',
          }"
        >
          <template v-slot:item.date="{ item }">
            {{ item.date.substr(0, 10) }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small outlined v-bind="attrs" @click="ver(item)">
                  Ver
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      buscar: "",
      categoria: "todas",
      listaColumnas: [
        { text: "Todas las Columnas", value: "todas" },
        { text: "Concepto", value: "policy_concept.name" },
        { text: "Fecha", value: "date" },
        { text: "Total", value: "total" },
      ],
      headers: [
        { text: "Concepto", value: "policy_concept.name", align: "start" },
        { text: "Fecha", value: "date" },
        { text: "Total", value: "total" },
        { text: "Acciones", value: "actions" },
      ],
      egresos: [{ concept: "Prueba", date: "15-07-2020", total: "Prueba" }],
    };
  },
  methods: {
    ...mapActions("Egresos", ["getPolicy"]),

    ver(item) {
      console.log(item._id);
      this.$router.push({
        name: "EgresosVer",
        params: {
          id: item._id,
        },
      });
    },
  },
  computed: {
    ...mapState("Egresos", ["policy"]),

    metodoBusqueda() {
      if (this.categoria === "todas") {
        return this.buscar;
      }
      return null;
    },
    filtroColumna() {
      if (this.categoria !== "todas") {
        return this.policy.filter((element) => {
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
      return this.policy;
    },
  },

  mounted() {
    this.getPolicy();
    //console.log(this.policy)
  },
};
</script>
  
<style>
.table-style {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.buscador {
  max-width: 1000px;
  margin: 0 auto;
}
</style>