<template>
  <v-app id="inspire">
    <v-container class="contenedor">
      <br />
      <v-row>
        <v-col cols="6" align="center">
          <v-btn block x-large  outlined :class="{ ClientActive: clientesColor }">
            <h3 @click="setClientesOn">Ver clientes</h3>
          </v-btn>
        </v-col>
        <v-col cols="6" align="center">
          <v-btn block x-large  outlined @click="MovetoExpedients">
            <h3>Ver Expedientes</h3>
          </v-btn>
        </v-col>
      </v-row>
      <br />
      <br />
      <v-row>
        <br />
        <v-col sm="4">
          <v-text-field
            v-model="buscar"
            append-icon="mdi-magnify"
            label="Buscar"
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
        <v-col sm="4">
          <v-select
            label="Filtrar por Columna"
            :items="listaColumnas"
            outlined
            v-model="categoria"
          ></v-select>
        </v-col>
        <v-col sm="4">
          <v-btn
            class="elevation-2"
            x-large
            depressed
            dark
            color="clientes2"
            style="text-align=flex-end"
            to="/ClientesRegistro"
            >
            Crear cliente
            <v-icon class="ml-2"> mdi-account-plus </v-icon>
          </v-btn></v-col
        >
      </v-row>
      <!-- <v-spacer></v-spacer> -->

      <v-data-table
        :headers="headers"
        :items="filtroColumna"
        :search="metodoBusqueda"
        no-results-text="No se han encotrado resultados."
        no-data-text="No se han encotrado resultados."
        class="elevation-5"
        :footer-props="{
          itemsPerPageOptions: [5, 10, 15, -1],
          itemsPerPageText: 'Datos por página',
          itemsPerPageAllText: 'Todos',
        }"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            :disabled="!item.status"
            class=" mr-2"
            color="#827655"
            elevation="0"
            trasparent
            outlined
            small
            @click="crearExpediente(item)"
          >
            Crear Expediente
          </v-btn>

          <v-btn
            class="clientes1--text"
            elevation="0"
            color="#00838F"
            outlined
            @click="editCliente(item)"
            small
          >
            Editar
          </v-btn>
        </template>
        <template v-slot:item.status="{ item }">
          {{ item.status ? "Activo" : "Inactivo" }}
          <v-switch
            color="clientes2"
            :key="item.name"
            v-model="item.status"
            @click="editStatus(item)"
          />
        </template>
      </v-data-table>
      <v-dialog persistent v-model="dialogStatus" max-width="600px">
        <v-card>
          <v-card-title
            class="headline"
            style="padding: 2rem; font-family: 'Open Sans'"
            >¿Quieres cambiar el status de este cliente?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="clientes1--text" text @click="closeStatus"
              >No quiero cambiarlo.</v-btn
            >
            <v-btn class="clientes2--text" text @click="changeStatusConfirm"
              >Si quiero cambiarlo.</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      snackbar: false,
      buscar: "",
      editedItem: null,
      editedStatusIndex: -1,
      dialogStatus: false,
      categoria: "todas",
      listaColumnas: [
        { text: "Todas las Columnas", value: "todas" },
        { text: "Nombre", value: "name" },
        { text: "CURP", value: "curp" },
        { text: "RFC", value: "rfc" },
      ],
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "name",
        },
        { text: "CURP", value: "curp" },
        { text: "RFC", value: "rfc" },
        { text: "Status", value: "status", sortable: false },
        { text: "Opciones", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    /* this.$store.dispatch("getClientes"); */
    this.getClientes();
    this.setClientesOn();
  },

  computed: {
    /* clientes() {
      return this.$store.getters.clientes;
    }, */
    ...mapState("Clientes", ["clientes"]),
    ...mapState("header", ["clientesColor"]),

    metodoBusqueda() {
      if (this.categoria === "todas") {
        return this.buscar;
      }
      return null;
    },
    filtroColumna() {
      if (this.categoria !== "todas") {
        return this.clientes.filter((element) =>
          element[this.categoria]
            .toString()
            .toUpperCase()
            .includes(this.buscar.toUpperCase())
        );
      }
      return this.clientes;
    },
  },

  methods: {
    ...mapActions("Clientes", ["getClientes", "changeClStatus"]),
    ...mapMutations("header", ["setClientesOn"]),
    MovetoExpedients() {
      this.setClientesOn();
      this.$router.push({
        name: "ExpedientesLista",
      });
    },
    crearExpediente(item) {
      this.$router.push({
        name: "ExpedientesRegistro",
        params: {
          cliente: item,
        },
      });
    },

    editCliente(item) {
      var editedIndex = this.clientes.indexOf(item);
      this.$router.push({
        name: "ClientesEditar",
        params: { editItem: item, index: editedIndex },
      });
    },

    editStatus(item) {
      this.dialogStatus = true;
      this.editedStatusIndex = this.clientes.indexOf(item);
      this.editedItem = item._id;
    },
    closeStatus() {
      this.clientes[this.editedStatusIndex].status = !this.clientes[
        this.editedStatusIndex
      ].status;
      this.editedStatusIndex = -1;
      this.dialogStatus = false;
    },

    async changeStatusConfirm() {
      var temp = {
        id: this.editedItem,
        status: this.clientes[this.editedStatusIndex].status,
      };
      /* await this.$store.dispatch("changeClStatus", temp); */
      await this.changeClStatus(temp);
      this.editedStatusIndex = -1;
      this.dialogStatus = false;
    },
  },
};
</script>

<style scoped>
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
  color: #ccc !important;
}
.ClientActive {
  background-color: /* #72a88a */ #2a566a;
  color: azure;
}
</style>