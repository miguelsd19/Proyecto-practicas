<template>
  <div id="app">
    <v-app id="inspire" class="fondo-gris">
      <v-container class="contenedor elevation-10 pa-10">
        <br />
        <br />
        <v-row align="center" justify="center">
          <v-col cols="3">
            <h3 align="center">{{ currentPolicy.date.substr(0, 10) }}</h3>
          </v-col>
          <v-col cols="6">
            <h3 align="center">{{ currentPolicy.policy_concept.name }}</h3>
          </v-col>
          <v-col cols="3">
            <v-btn large depressed dark color="#7b4849" @click="downloadPDF">
              <v-icon class="mr-2" large>mdi-download-box</v-icon>
              Descargar PDF
            </v-btn>
            
          </v-col>
        </v-row>
        
        <br />
        <v-data-table
          :headers="headers"
          class="elevation-5"
          no-results-text="No se han encotrado resultados."
          :footer-props="{
            itemsPerPageOptions: [5, 10, 15, -1],
            itemsPerPageText: 'Datos por página:',
          }"
          :items="currentPolicy.outcome"
        >
        </v-data-table>

        <br />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
export default {
  data() {
    return {
      policy: [],
      headers: [
        { text: "Escritura", value: "proceedings.scripture" },
        { text: "Expediente", value: "proceedings.id_generated" },
        { text: "Cantidad", value: "outcome_amount" },
        { text: "Pasivo", value: "Pasive" },
      ],

      prueba: [
        {
          escritura: "Prueba",
          Exp: "15-07-2020",
          numberOf: "Prueba",
          Pasive: "Prueba",
        },
      ],
    };
  },
  methods: {
    ...mapActions("Egresos", ["getCurrentPolicy"]),

    downloadPDF() {
      var policyData = this.currentPolicy.outcome;
      var data = [];
      console.log(policyData);
      for (var i = 0; i < policyData.length; i++) {
        if (policyData[i].proceedings === null) {
          data.push({
            scripture: "",
            proceeding: "",
            quantity: policyData[i].outcome_amount.toString(),
            //Pasive: policyData[i].Pasive
          });
        } else {
          data.push({
            scripture: policyData[i].proceedings.scripture,
            proceeding: policyData[i].proceedings.id_generated,
            quantity: policyData[i].outcome_amount.toString(),
            //Pasive: policyData[i].Pasive
          });
        }
      }
      let docName =
        "Poliza " +
        this.currentPolicy.policy_concept.name +
        " " +
        this.currentPolicy.date.substr(0, 10) +
        ".pdf";
      var columns = [
        { title: "Escritura", dataKey: "scripture" },
        { title: "Expediente", dataKey: "proceeding" },
        { title: "Cantidad", dataKey: "quantity" },
        //{title:"Pasivo", dataKey:"Pasive"}
      ];
      const doc = new jsPDF("p", "pt");
      doc.text("Poliza de " + this.currentPolicy.policy_concept.name, 40, 40); // Texto
      doc.text(400, 40, this.currentPolicy.date.substr(0, 10));
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1); // Linea divisora
      doc.autoTable(columns, data, {
        //Tabla
        margin: { top: 60 },
      });
      doc.save(docName);
    },
  },

  props: ["id"],

  created() {
    if (this.id !== undefined) {
      this.getCurrentPolicy(this.id);
    }
  },

  computed: {
    ...mapState("Egresos", ["currentPolicy"]),
  },
};
</script>

<style>
</style>