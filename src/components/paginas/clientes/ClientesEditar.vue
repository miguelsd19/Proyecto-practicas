<template>
  <div class="fondo-gris">
    <v-app class="contenedor elevation-10 pa-10">
      <v-form ref="form" v-model="valid" class="loc" lazy-validation>
        <v-snackbar v-model="snackbar" :timeout="4000" centered color="success"
          >Cliente editado correctamente.</v-snackbar
        >
        <v-snackbar v-model="snackbar2" :timeout="4000" centered color="red"
          >Ocurrió un error, inténtelo de nuevo.</v-snackbar
        >
        <v-row>
          <v-col sm="12">
            <v-text-field
              outlined
              v-model="name"
              :rules="rulesClientes.nameRules"
              label="Nombre Completo"
              hint="Introduce de 5 a 50 carácteres."
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="8">
            <v-text-field
              outlined
              v-model="calle"
              :rules="rulesClientes.calleRules"
              label="Calle"
              hint="Introduce de 4 a 50 carácteres"
              required
            ></v-text-field>
          </v-col>

          <v-col sm="4">
            <v-text-field
              outlined
              v-model="numero"
              type="text"
              v-mask="'########'"
              :rules="rulesClientes.numberRules"
              label="Número"
              hint="Introduce de 2 a 8 carácteres"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="8">
            <v-text-field
              outlined
              v-model="col"
              :rules="rulesClientes.colRules"
              label="Colonia"
              hint="Introduce de 4 a 50 carácteres"
              required
            ></v-text-field>
          </v-col>

          <v-col sm="4">
            <v-text-field
              outlined
              v-model="cp"
              type="text"
              v-mask="'#########'"
              :rules="rulesClientes.cpRules"
              label="Código postal"
              hint="Introduce de 4 a 9 carácteres"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="6">
            <v-text-field
              outlined
              v-model="city"
              :rules="rulesClientes.cityRules"
              label="Ciudad"
              hint="Introduce de 5 a 50 carácteres"
              required
            ></v-text-field>
          </v-col>

          <v-col sm="6">
            <v-text-field
              outlined
              v-model="municipio"
              :rules="rulesClientes.muniRules"
              label="Municipio"
              hint="Introduce de 4 a 50 carácteres"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="6">
            <v-text-field
              outlined
              v-model="tel1"
              type="text"
              v-mask="'#############'"
              :rules="rulesClientes.tel1Rules"
              label="Teléfono 1"
              hint="Introduce de 8 a 13 carácteres"
              required
            ></v-text-field>
          </v-col>

          <v-col sm="6">
            <v-text-field
              outlined
              v-model="tel2"
              type="text"
              v-mask="'#############'"
              :rules="rulesClientes.tel2Rules"
              label="Teléfono 2 (Opcional)"
              hint="Introduce de 8 a 13 carácteres"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="6">
            <v-text-field
              outlined
              v-model="rfc"
              :rules="rulesClientes.rfcRules"
              :counter="13"
              label="R.F.C"
              hint="Introduce de 12 a 13 carácteres"
              required
            ></v-text-field>
          </v-col>

          <v-col sm="6">
            <v-text-field
              x-small
              outlined
              v-model="curp"
              :rules="rulesClientes.curpRules"
              :counter="18"
              label="CURP"
              hint="Introduce 18 carácteres"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>

      <v-btn style="" x-large :disabled="!valid" color="clientes2" class="white--text" @click="editClientes">
        Guardar
        <v-icon class="ml-2"> mdi-account-edit </v-icon>
      </v-btn>
    </v-app>
  </div>
</template>

<script>
/* import Swal from "sweetalert2"; */
import { mapActions, mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  props: ["editItem", "index"],
  data() {
    return {
      snackbar: false,
      snackbar2: false,
      valid: true,
      name: null,
      calle: null,
      numero: null,
      col: null,
      cp: null,
      city: null,
      municipio: null,
      tel1: null,
      tel2: "",
      rfc: null,
      curp: null,
    };
  },
  created() {
    if (this.editItem === undefined) {
      this.$router.push("/ClientesLista");
    } else {
      this.name = this.editItem.name;
      this.calle = this.editItem.adress.street;
      this.numero = this.editItem.adress.number;
      this.col = this.editItem.adress.colony;
      this.cp = this.editItem.adress.postal_code;
      this.city = this.editItem.adress.city;
      this.municipio = this.editItem.adress.municipality;
      this.tel1 = this.editItem.phone_1;
      if (this.editItem.phone_2 === undefined) {
        this.tel2 = "";
      } else {
        this.tel2 = this.editItem.phone_2;
      }

      this.rfc = this.editItem.rfc;
      this.curp = this.editItem.curp;
    }
  },

  computed: {
    ...mapState("Clientes", ["clientes"]),
    ...mapState("rules", ["rulesClientes"]),
  },

  methods: {
    ...mapActions("Clientes", ["editCliente"]),

    validate() {
      this.$refs.form.validate();
    },

    async editClientes() {
      var temp = {
        id: this.editItem._id,
        index: this.index,
        name: this.name,
        rfc: this.rfc,
        curp: this.curp,
        phone_1: this.tel1,
        phone_2: this.tel2,
        status: this.editItem.status,
        adress: {
          street: this.calle,
          number: this.numero,
          colony: this.col,
          postal_code: this.cp,
          city: this.city,
          municipality: this.municipio,
        },
      };
      await this.editCliente(temp).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Listo!",
            text: "Se ha editado correctamente el cliente",
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal!",
            text: "Intentelo mas tarde",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
      this.$router.push("ClientesLista");
    },
  },
};
</script>

<style scoped>
 .loc {
  margin-bottom: 2rem;
  margin-top: 3rem;
}
.temp {
  margin-bottom: 2rem;
} 
.v-text-field {
  height: 80px;
}
.v-btn {
  width: 15rem;
  display: flex;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
}
</style>