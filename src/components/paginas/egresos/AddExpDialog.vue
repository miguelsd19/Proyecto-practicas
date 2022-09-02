<template>
  <v-row justify="center">
    <v-dialog v-model="draw" persistent max-width="600px">
      <v-card height="650">
        <v-form ref="form">
          <v-row align="center" justify="center">
            <v-col cols="3"></v-col>
            <v-col cols="6"><h2 align="center">Egreso</h2> </v-col>
            <v-col cols="3">
              <v-btn large icon color="red" @click="draw = false"
                ><v-icon>mdi-close-circle</v-icon></v-btn
              >
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <p />
          <p align="center">Selecciona el concepto</p>
          <v-row align="center" justify="center">
            <v-col cols="8">
              <v-autocomplete
                :rules="rules.required"
                class="text-center mb-5"
                outlined
                append-icon="mdi-magnify"
                label="Concepto de egreso"
                :items="conceptosName"
                v-model="outcomeVal"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <p align="center">Selecciona el expediente</p>
          <v-row align="center" justify="center">
            <v-col cols="4">
              <v-autocomplete
                :rules="rules.required"
                class="text-center mb-5"
                outlined
                append-icon="mdi-magnify"
                label="Nombre del cliente"
                :items="expedientesName"
                v-model="proceedingVal"
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                :disabled="proceedingVal === ''"
                :rules="rules.required"
                class="text-center mb-5"
                outlined
                append-icon="mdi-magnify"
                label="Número del expediente"
                :items="ids"
                v-model="proceedingIDval"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <p />
          <p align="center">Ingresa la cantidad</p>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-text-field
                :rules="rules.required"
                class="text-center mb-5"
                outlined
                label="Cantidad"
                v-model.number="amount"
                type="number"
                @keyup.enter="send"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-btn x-large block depressed color="#A5D3AE" @click="send">
                Añadir
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      outcomeVal: "",
      proceedingVal: "",
      amount: null,
      draw: false,
      clientName: [],
      polID: "",
      policyC: "",
      proceedingIDval: "",
      ids: [],
    };
  },

  methods: {
    ...mapActions("Egresos", ["addoutcome", "addTableData"]),
    ...mapActions("Expedientes", ["getExpedientes"]),
    ...mapActions("Datos", ["getConceptos"]),

    send() {
      if (this.$refs.form.validate()) {
        let egreso = {
          id: this.polID,
          proceedings: "",
          outcome_concept: "",
          outcome_amount: parseInt(this.amount),
        };
        let tableData = {
          proceeding: this.proceedingVal,
          outcome_concept: this.outcomeVal,
          outcome_amount: this.amount,
          scripture: "",
        };

        for (var j = 0; j < this.expedientes.length; j++) {
          if (
            this.expedientes[j].client.name === this.proceedingVal &&
            this.expedientes[j].id_generated === this.proceedingIDval
          ) {
            // ya que solo se puede enviar 1 egreso y puede haber nombres rep
            egreso.proceedings = this.expedientes[j]._id;
            tableData.scripture = this.expedientes[j].scripture;
          }
        }

        for (var i = 0; i < this.conceptos.length; i++) {
          if (this.conceptos[i].name === this.outcomeVal) {
            egreso.outcome_concept = this.conceptos[i]._id;
          }
        }
        this.addTableData(tableData);
        this.addoutcome(egreso);
        this.draw = false;
        this.$refs.form.reset();
      }
    },
  },
  computed: {
    ...mapState("Expedientes", ["expedientes", "expedientesName"]),
    ...mapState("Datos", ["conceptos", "conceptosName"]),
    ...mapState("rules", ["rules"]),
  },

  created() {
    if (
      this.outcomeVal !== "" ||
      this.proceedingVal !== "" ||
      this.proceedingIDval !== "" ||
      this.amount !== null
    ) {
      this.$refs.form.reset();
    }
    this.getExpedientes();
    this.getConceptos();
  },

  watch: {
    proceedingVal() {
      this.ids = [];
      for (var i = 0; i < this.expedientes.length; i++) {
        if (this.expedientes[i].client.name === this.proceedingVal) {
          this.ids.push(this.expedientes[i].id_generated);
        }
      }
    },
  },
};
</script>

