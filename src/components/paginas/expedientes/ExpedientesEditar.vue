<template>
  <div id="app">
    <v-app id="inspire" class="fondo-gris">
      <v-container class="contenedor elevation-10 grey--text text--darken-3">
        <v-row justify="center">
          <v-dialog v-model="draw" persistent max-width="600px">
            <v-card>
              <v-card-title primary-title class="justify-center">
                <div>
                  <h3 v-if="status === true">Cerrar Expediente</h3>
                  <h3 v-else>Abrir Expediente</h3>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p class="subtitle-1" align="center" v-if="status === true">
                  ¿Está seguro que quiere cerrar el expediente?
                </p>
                <p class="subtitle-1" align="center" v-else>
                  ¿Está seguro que quiere volver a abrir el expediente?
                </p>
              </v-card-text>
              <v-card-actions class="justify-center pb-5">
                <v-btn
                  x-large
                  dark
                  color="green"
                  @click="cambiarStatusExpediente"
                >
                  Si
                </v-btn>
                <v-btn x-large dark color="error" @click="draw = false">
                  No
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row class="mt-10" align="center" justify="center">
          <v-col cols="3">
            <h4 class="title" align="center">No. Expediente:</h4>
            <p class="subtitle-1" align="center">{{ noExpediente }}</p>
          </v-col>

          <v-col cols="6">
            <h4 class="title" align="center">Cliente:</h4>
            <p class="subtitle-1" align="center">{{ nombre }}</p>
          </v-col>

          <v-col cols="3">
            <h4 class="title" align="center">Fecha:</h4>
            <p class="subtitle-1" align="center">{{ fecha }}</p>
          </v-col>

          <v-col cols="3">
            <h4 class="title" align="center">Catálogo:</h4>
            <p class="subtitle-1" align="center">{{ catalogo }}</p>
          </v-col>

          <v-col cols="6">
            <h4 class="title" align="center">Proyectista:</h4>
            <p class="subtitle-1" align="center">{{ proyectista }}</p>
            <h4 class="title" align="center">Estatus:</h4>
            <p class="subtitle-1" align="center">{{ statusText }}</p>
            <center>
              <v-btn
                class="elevation-2"
                dark
                :color="colorBtnCerrarExp"
                @click="draw = true"
                >{{ cambiarStatus }}
                <v-icon
                  v-if="cambiarStatus === 'Cerrar Expediente'"
                  class="ml-2"
                  >mdi-lock
                </v-icon>
                <v-icon v-else class="ml-2">mdi-lock-open-variant</v-icon>
              </v-btn>
            </center>
          </v-col>
          <v-col cols="3">
            <p></p>
          </v-col>
        </v-row>

        <div class="seccion-egre-ingre mb-10">
          <div class="egresos mr-5">
            <h3 class="title mb-3" style="height: 36px">Egresos</h3>
            <v-data-table
              :headers="headersEgresos"
              :items="egresosArr"
              :footer-props="{
                itemsPerPageOptions: [5, 10, 15, -1],
                itemsPerPageText: 'Datos por página:',
                itemsPerPageAllText: 'Todos',
              }"
              no-data-text="No hay egresos en este expediente."
              class="elevation-5"
            ></v-data-table>
          </div>

          <div class="ingresos-gastos ml-5">
            <div class="ingresos">
              <div class="d-flex justify-space-between">
                <h3 class="title">Ingresos</h3>
                <v-btn
                  color="#827655"
                  class="elevation-2 mb-3"
                  dark
                  @click="dialogIngreso = true"
                  >Añadir Ingreso
                  <v-icon class="ml-2">mdi-bank-transfer-in</v-icon>
                </v-btn>
              </div>
              <v-data-table
                :headers="headersIngresos"
                :items="ingresosArr"
                :footer-props="{
                  itemsPerPageOptions: [5, 10, 15, -1],
                  itemsPerPageText: 'Datos por página:',
                  itemsPerPageAllText: 'Todos',
                }"
                no-data-text="No hay ingresos en este expediente."
                class="elevation-5"
              >
                <template v-slot:item.date="{ item }">
                  {{ formatoFecha(item) }}
                </template>
              </v-data-table>
            </div>
            <div class="gastos pt-6">
              <div class="d-flex justify-space-between">
                <h3 class="title">Gastos Especiales</h3>
                <v-btn
                  color="#827655"
                  class="elevation-2 mb-3"
                  dark
                  @click="dialogGasto = true"
                  >Añadir Gasto Especial <v-icon class="ml-2">mdi-cash</v-icon>
                </v-btn>
              </div>
              <v-data-table
                :headers="headersPagosEspeciales"
                :items="pagosEspecialesArr"
                :footer-props="{
                  itemsPerPageOptions: [5, 10, 15, -1],
                  itemsPerPageText: 'Datos por página:',
                  itemsPerPageAllText: 'Todos',
                }"
                no-data-text="No hay pagos especiales en este expediente."
                class="elevation-5"
              >
                <template v-slot:item.date="{ item }">
                  {{ formatoFecha(item) }}
                </template>
              </v-data-table>
            </div>
          </div>
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
              <div>Algo salió mal, por favor inténtelo nuevamente.</div>
            </v-layout>
          </v-layout>
        </v-snackbar>
      </v-container>
      <v-dialog v-model="dialogIngreso" max-width="500px">
        <v-card>
          <v-card-title
            >Nuevo Ingreso
            <v-divider transparent class="temp"></v-divider>
            <v-btn large icon color="red" @click="dialogIngreso = false"
              ><v-icon>mdi-close-box</v-icon></v-btn
            >
          </v-card-title>
          <v-divider color="#ccc"></v-divider>
          <v-card-text>
            <v-container>
              <h3
                style="
                  display: flex;
                  justify-content: flex-end;
                  padding: 1.1rem 1rem;
                "
              >
                {{ fechaAux }}
              </h3>
              <v-form v-model="validAux">
                <v-select
                  label="Concepto"
                  :rules="rules.conceptoRules"
                  required
                  outlined
                  hint="Selecciona el concepto"
                  v-model="conceptoIngreso"
                  :items="selectConceptos"
                ></v-select>

                <v-select
                  label="Cuenta"
                  :rules="rules.cuentaRules"
                  required
                  outlined
                  hint="Selecciona la cuenta"
                  v-model="cuentaIngreso"
                  :items="selectCuentas"
                ></v-select>

                <v-text-field
                  v-model="cantidadIngreso"
                  :rules="rules.cantidadRules"
                  outlined
                  type="number"
                  label="Cantidad"
                  hint="Introduce la cantidad del ingreso"
                  required
                ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <center>
            <v-btn
              x-large
              color="#827655"
              dark
              :disabled="!validAux"
              @click="registrarIngreso"
            >
              Añadir Ingreso
            </v-btn>
          </center>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogGasto" max-width="500px">
        <v-card>
          <v-card-title
            >Nuevo Gasto Especial
            <v-divider transparent class="temp"></v-divider>
            <v-btn large icon color="red" @click="dialogGasto = false"
              ><v-icon>mdi-close-box</v-icon></v-btn
            >
          </v-card-title>
          <v-divider color="#ccc"></v-divider>
          <v-card-text>
            <v-container>
              <h3
                style="
                  display: flex;
                  justify-content: flex-end;
                  padding: 1.1rem 1rem;
                "
              >
                {{ fechaAux }}
              </h3>
              <v-form v-model="validAux">
                <v-select
                  label="Concepto"
                  :rules="rules.conceptoRules"
                  required
                  outlined
                  hint="Selecciona el concepto"
                  v-model="conceptoPago"
                  :items="selectConceptos"
                ></v-select>

                <v-text-field
                  v-model="cantidadPago"
                  :rules="rules.cantidadRules"
                  outlined
                  type="number"
                  label="Cantidad"
                  hint="Introduce la cantidad del pago mayor a 2 digitos."
                  required
                ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <center>
            <v-btn
              color="#827655"
              x-large
              dark
              :disabled="!validAux"
              @click="registrarPago"
            >
              Añadir Pago Especial
            </v-btn>
          </center>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
export default {
  props: ["editItem"],
  data() {
    return {
      snackbar: false,
      validAux: true,
      conceptoIngreso: null,
      cuentaIngreso: null,
      cantidadIngreso: null,
      conceptoPago: null,
      cantidadPago: null,
      fechaAux: new Date().toISOString().substr(0, 10),
      dialogGasto: false,
      dialogIngreso: false,
      draw: false,
      nombre: "",
      fecha: "",
      noExpediente: "",
      catalogo: "",
      proyectista: "",
      status: "",
      ingresosArr: [],
      pagosEspecialesArr: [],
      egresosArr: [],
      headersEgresos: [
        { text: "Concepto", align: "start", value: "outcome_concept.name" },
        { text: "Cantidad", value: "outcome_amount" },
      ],
      headersIngresos: [
        { text: "Fecha", value: "date" },
        { text: "Concepto", value: "income_concept.name" },
        { text: "Cantidad", value: "income_amount" },
      ],
      headersPagosEspeciales: [
        { text: "Fecha", value: "date" },
        { text: "Concepto", value: "concept.name" },
        { text: "Cantidad", value: "quantity" },
      ],
    };
  },
  methods: {
    ...mapActions("Expedientes", [
      "editExpedienteStatus",
      "addIngreso",
      "addPagoEspecial",
    ]),
    ...mapMutations("Datos", ["setAccesoDinamico"]),
    ...mapActions("Egresos", ["getproceedings"]),
    ...mapActions("Datos", [
      "getIngresos",
      "getPagosEspeciales",
      "getConceptos",
      "getCuentas",
    ]),
    async cambiarStatusExpediente() {
      let exp = {
        _id: this.editItem._id,
        status: !this.status,
      };

      await this.editExpedienteStatus(exp)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Listo!",
              text: "Se ha cambiado el estatus del expediente",
              showConfirmButton: false,
              timer: 1500,
            });
            if (response.data.status !== this.status) {
              this.status = response.data.status;
            }
          }
        })
        .catch((err) => {
          this.snackbar = true;
          console.log(err);
        });
      this.draw = false;
    },
    formatoFecha(item) {
      if (item.date !== null) {
        return item.date.substr(0, 10);
      }
      return "";
    },
    registrarIngreso() {
      let ing = {
        expId: this.editItem._id,
        data: {
          income_amount: this.cantidadIngreso,
          income_concept: this.conceptoIngreso,
          account: this.cuentaIngreso,
        },
      };
      //let reciboName = "Recibo " + this.conceptoIngreso + ".pdf";
      this.addIngreso(ing)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Listo!",
              text: "El nuevo ingreso ha sido registrado.",
              showConfirmButton: false,
              timer: 1500,
            });
            this.ingresosArr.push(response.data);
            this.dialogIngreso = false;
            let responseD = response.data;

            let data = {
              reciboName:
                "Recibo INGRESO " +
                responseD.income_concept.name +
                " " +
                responseD.date.substr(0, 10) +
                ".pdf",
              incomeC: responseD.income_concept.name,
              IngDate: responseD.date.substr(0, 10),
              amount: responseD.income_amount.toString(),
            };

            //impresion PDF
            const doc = new jsPDF("l", "in", [5, 5]);
            doc.text("Recibo ingreso", 0.5, 1);
            doc.setLineWidth(0.01).line(0.5, 1.1, 4.5, 1.1);

            doc.text(3, 1, data.IngDate);
            doc.text(1, 2, "Concepto: " + data.incomeC);
            doc.text(1, 3, "Cantidad: " + data.amount);

            doc.save(data.reciboName);
          }
        })
        .catch((err) => {
          this.snackbar = true;
          console.log(err);
        });
    },
    registrarPago() {
      let pago = {
        expId: this.editItem._id,
        data: {
          concept: this.conceptoPago,
          quantity: this.cantidadPago,
        },
      };
      this.addPagoEspecial(pago)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Listo!",
              text: "Se ha registrado el nuevo pago especial.",
              showConfirmButton: false,
              timer: 1500,
            });
            this.pagosEspecialesArr.push(response.data);
            this.dialogGasto = false;

            //impresion PDF
            let data = response.data;
            let reciboName =
              "Recibo gasto especial " +
              data.concept.name +
              " " +
              data.date.substr(0, 10) +
              ".pdf";
            const doc = new jsPDF("l", "in", [5, 5]);
            doc.text("Recibo GASTO ESPECIAL", 0.5, 1);
            doc.setLineWidth(0.01).line(0.5, 1.1, 4.5, 1.1);

            doc.text(3, 1, data.date.substr(0, 10));
            doc.text(1, 2, "Concepto: " + data.concept.name);
            doc.text(1, 3, "Cantidad: " + data.quantity);

            doc.save(reciboName);
          }
        })
        .catch((err) => {
          this.snackbar = true;
          console.log(err);
        });
    },
    setIngresos() {
      if (this.editItem.incomes.length > 0) {
        this.ingresosArr = this.editItem.incomes;
      }
    },
    setPagosEspeciales() {
      if (this.editItem.special_payment.length > 0) {
        this.pagosEspecialesArr = this.editItem.special_payment;
      }
    },
    setEgresos() {
      if (this.editItem.outcomes.length > 0) {
        this.egresosArr = this.editItem.outcomes;
      }
    },
  },
  computed: {
    ...mapState("rules", ["rules"]),
    ...mapState("Egresos", ["proceedings"]),
    ...mapState("Datos", [
      "ingresos",
      "pagosEspeciales",
      "cuentas",
      "conceptos",
    ]),
    selectConceptos() {
      let conceptos = this.conceptos.map((el) => {
        return { text: el.name, value: el._id };
      });
      return conceptos;
    },
    selectCuentas() {
      let cuentas = this.cuentas.map((el) => {
        return { text: el.name, value: el._id };
      });
      return cuentas;
    },
    statusText() {
      if (this.status === true) {
        return "Abierto";
      }
      if (this.status === false) {
        return "Cerrado";
      }
      return "";
    },
    cambiarStatus() {
      if (this.status === true) {
        return "Cerrar Expediente";
      }
      if (this.status === false) {
        return "Abrir Expediente";
      }
      return "";
    },
    colorBtnCerrarExp() {
      if (this.status === true) {
        return "error";
      }
      if (this.status === false) {
        return "green";
      }
      return "";
    },
  },
  created() {
    this.getConceptos();
    this.getCuentas();
    this.getproceedings()
      .then((response) => {
        if (response.status === 200) {
          this.setEgresos();
        }
      })
      .catch((err) => {
        this.snackbar = true;
        console.log(err);
      });
    this.getIngresos()
      .then((response) => {
        if (response.status === 200) {
          this.setIngresos();
        }
      })
      .catch((err) => {
        this.snackbar = true;
        console.log(err);
      });
    this.getPagosEspeciales()
      .then((response) => {
        if (response.status === 200) {
          this.setPagosEspeciales();
        }
      })
      .catch((err) => {
        this.snackbar = true;
        console.log(err);
      });
    this.nombre = this.editItem.client.name;
    this.fecha = this.editItem.date.substr(0, 10);
    this.noExpediente = this.editItem.id_generated;
    this.catalogo = this.editItem.catalog_formalities.name;
    this.proyectista = this.editItem.projectist.name;
    this.status = this.editItem.status;
  },
  destroyed() {
    this.setAccesoDinamico(false);
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
.egresos {
  max-width: 500px;
}
.seccion-egre-ingre {
  padding-top: 5rem;
  max-width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.v-card__text {
  padding: 0px;
}
.temp.theme--light.v-divider {
  border-color: white !important;
}
</style>