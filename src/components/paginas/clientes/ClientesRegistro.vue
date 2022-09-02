<template>
  <div class="fondo-gris">
    <v-app class="contenedor elevation-10 pa-10">
      <v-form ref="form" v-model="valid" class="loc">
        <v-row>
          <v-col sm="12">
          <v-text-field
            outlined
            v-model="name"
            :rules="rulesClientes.nameRules"
            label="Nombre Completo"
            hint="Introduce de 5 a 50 carácteres"
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
              label="Codigo postal"
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
              lazy-validation
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

      <v-btn x-large :disabled="!valid" class="white--text" color="clientes2" @click="add">
        Registrar
        <v-icon class="ml-2"> mdi-account-plus </v-icon>
      </v-btn>

      <v-dialog v-model="dialogExp" persistent width="600px">
        <v-card>
          <v-card-title>
            Crear Expediente
            <v-divider transparent class="temp"></v-divider>
            <!-- <v-btn style="max-width: 3rem; max-height: 3rem" large icon color="red" @click="dialogExp=false"><v-icon>mdi-close-box</v-icon></v-btn> -->
          </v-card-title>
          <v-divider color="#ccc"></v-divider>
          <v-card-text style="font-size: 1.1rem; padding: 2rem">
            ¿Desea crear un expediente para el nuevo cliente? O deseas salir.
          </v-card-text>
          <v-card-actions>
            <v-btn large class="white--text" color="clientes1" @click="noCrearExp">Salir</v-btn>
            <v-btn large class="white--text" color="clientes2" @click="crearExp">Crear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      temp: {},
      dialogExp: false,
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
  computed:{
    ...mapState("Clientes", ["clientes"]),
    ...mapState("rules",["rulesClientes"]),
  },
  methods: {
    ...mapActions("Clientes", ["addCliente"]),
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    add() {
      var temp = {};
      if (this.tel2 === '' || this.tel2 === undefined || this.tel2 === null) {
        temp = {
          name: this.name,
          rfc: this.rfc,
          curp: this.curp,
          phone_1: this.tel1,
          status: true,
          adress: {
            street: this.calle,
            number: this.numero,
            colony: this.col,
            postal_code: this.cp,
            city: this.city,
            municipality: this.municipio,
          },
        };
      } else {
        temp = {
          name: this.name,
          rfc: this.rfc,
          curp: this.curp,
          phone_1: this.tel1,
          phone_2: this.tel2,
          status: true,
          adress: {
            street: this.calle,
            number: this.numero,
            colony: this.col,
            postal_code: this.cp,
            city: this.city,
            municipality: this.municipio,
          },
        };
      }
      this.validate();
      this.addCliente(temp).then(resp => {
        if (resp.status === 200) {
          this.temp = resp.data
            Swal.fire({
              icon: "success",
              title: "Listo!",
              text: "Se ha registrado el cliente.",
              showConfirmButton: false,
              timer: 2000,
            }).then(result =>{
              if (result.isDismissed){
              this.dialogExp = true
              }
              }
            );
            
          } else{
            Swal.fire({
              icon: "error",
              title: "Algo salio mal!",
              text: "Intentalo mas tarde",
              showConfirmButton: false,
              timer: 2500,
            });
          }
      });
      /* this.$store.dispatch("addCliente", temp); */
      this.reset();
    },
    crearExp(){
      this.$router.push({
                  name: "ExpedientesRegistro",
                  params: {
                    cliente: this.temp,
                  },
                });
    },
    noCrearExp(){
      this.$router.push("ClientesLista");
    }
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
.v-card__text{
  padding: 0px;
}
.v-btn__content{
  padding: 0px;
}
.temp.theme--light.v-divider {
    border-color: white !important; 
}
</style>