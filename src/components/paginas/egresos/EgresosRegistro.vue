<template>
  <v-app id="inspire" class="fondo-gris">
    <v-container class="contenedor elevation-10 pa-10">
      <br />
      <v-row>
        <v-col cols="12" align="center">
          <h2>Nueva Poliza</h2>
        </v-col>
      </v-row>
      <br />
      <v-row>
        <v-col cols="3"> </v-col>
        <v-col cols="6">
          <v-select
            outlined
            label="Seleccionar concepto"
            :items="conceptosName"
            v-model="PolicyConcept"
          >
          </v-select>
        </v-col>
        <v-col cols="3" align-self="center">
          <p align="center">{{ ActualDate }}</p>
        </v-col>
      </v-row>
      <v-row >
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col  align-self="center"  >
          <v-btn x-large depressed color="#7b4849" dark @click="Add">
            Agregar Egreso
            <v-icon class="ml-2">mdi-bank-transfer-out</v-icon>
          </v-btn>
        </v-col>
        <v-col >
          <v-btn
            :disabled="this.buttondisabled"
            :class="{btnclass: vbtnclass }"
            x-large
            depressed
            color="#7b4849"
            @click="save"
          >
            Guardar Póliza
            <v-icon class="ml-2">mdi-disc</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      
      <v-data-table :headers="headers" :items="tableData"> </v-data-table>
      <ExpDialog ref="ExpDialog"></ExpDialog>
    </v-container>
  </v-app>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ExpDialog from "./AddExpDialog";
import Swal from "sweetalert2";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Escritura", value: "scripture" },
        { text: "Expediente", value: "proceeding" },
        { text: "Cantidad", value: "outcome_amount" },
        { text: "Pasivo", value: "pasivo" },
      ],
      conceptsName: [],
      PolicyConcept: "",
      vbtnclass:false
    };
  },
  computed: {
    ...mapState("Datos", ["conceptos", "conceptosName"]),
    ...mapState("Egresos", ["policyID", "tableData", "PolicyToSend"]),
    buttondisabled() {
      if (this.PolicyConcept !== "" && this.tableData.length !== 0) {
        return false;
      }
      return true;
    },
    ActualDate() {
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
      return currentDateWithFormat;
    },
  },
  methods: {
    ...mapActions("Datos", ["getConceptos"]),
    ...mapActions("Egresos", [
      "generatePolicy",
      "clearPolicyData",
      "SendPolicyOutcomes",
      "getPolicy",
    ]),
    ...mapMutations("Egresos", ["clearPolicy"]),

    Add() {
      //this.$refs.form.reset()
      this.$refs.ExpDialog.draw = true;
      this.$refs.ExpDialog.polID = this.policyID;
      this.$refs.ExpDialog.policyC = this.PolicyConcept;
    },

    async save() {
      let policy = {
        policy_concept: "",
        outcome: this.PolicyToSend,
      };
      for (var i = 0; i < this.conceptos.length; i++) {
        if (this.conceptos[i].name === this.PolicyConcept) {
          policy.policy_concept = this.conceptos[i]._id;
        }
      }
      await this.SendPolicyOutcomes(policy).then((res) => {
        if (res.status === 200) {
          this.getPolicy();
          Swal.fire({
            icon: "success",
            title: "Agregados",
            text: "Se han añadido exitosamente a la poliza",
            showConfirmButton: false,
            timer: 2000,
          }).then((result) => {
            console.log(result);
            //Impresion pdf
            var data = this;
            var columns = [
              { title: "Escritura", dataKey: "scripture" },
              { title: "Expediente", dataKey: "proceeding" },
              { title: "Cantidad", dataKey: "outcome_amount" },
              { title: "Pasivo", dataKey: "pasivo" },
            ];
            let pdfTitle =
              "Poliza " + this.PolicyConcept + " " + this.ActualDate + ".pdf";
            const doc = new jsPDF("p", "pt");
            doc.text("Poliza de " + this.PolicyConcept, 40, 40); // Texto
            doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1); // Linea divisora
            doc.autoTable(columns, data.tableData, {
              //Tabla
              margin: { top: 60 },
            });
            doc.save(pdfTitle);
            this.$router.replace("/EgresosLista");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Surgio un error",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
    },
  },
  components: {
    ExpDialog,
  },
  created() {
    this.getConceptos();
    this.clearPolicy();
  },

  watch:{
    buttondisabled(){
      this.vbtnclass=true
    }
  }
};
</script>

<style scoped>

.btnclass{
  color: white;
}
</style>

