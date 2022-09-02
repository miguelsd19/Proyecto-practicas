<template>
  <div id="app">
    <v-app id="inspire">
      <v-main>
        <v-container class="mt-16" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <h1 class="text-center pa-6">Login Notaria 46</h1>
              <v-card class="elevation-12">
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      :rules="rules.email"
                      v-model="email"
                      label="Email"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      required
                    ></v-text-field>
                    <v-text-field
                      :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showpass = !showpass"
                      :type="showpass ? 'text' : 'password'"
                      :rules="rules.required"
                      v-model="password"
                      id="password"
                      label="Contraseña"
                      name="password"
                      prepend-icon="mdi-lock"
                      required
                      @keyup.enter="login"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :loading="draw"
                    color="#021b40"
                    class="white--text"
                    @click="login"
                    :disabled="!valid"
                    >Login</v-btn
                  >
                </v-card-actions>
              </v-card>
              <v-snackbar
                v-model="snackbar"
                :timeout="4000"
                centered
                color="red"
                >{{ ErrorText }}</v-snackbar
              >
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    ErrorText: null,
    snackbar: false,
    draw: false,
    menu: false,
    valid: true,
    email: "",
    password: "",
    showpass:""
  }),
  computed: {
    ...mapState("rules", ["rules"]),
  },
  methods: {
    ...mapMutations(["setCurrentUser", "setToken", "setLogin"]),

    async login() {
      if (this.$refs.form.validate()) {
        this.draw = true;
        const dataCurrentUser = {
          email: this.email.trim(),
          password: this.password.trim(),
        };
        await axios.post('api/auth', dataCurrentUser).then(response => {
          
                if(response.status === 200){
                    this.setCurrentUser(response.data.admin._id)
                    this.setToken(response.data.token)
                    this.setLogin(true)
                    axios.defaults.headers.common['x-auth-token'] = this.$store.getters["token"];
                }
            }).catch(err => {
                this.ErrorText="Email o contraseña incorectos, intentelo de nuevo"
                this.snackbar=true
                console.log(err)
                this.setCurrentUser("hola")
              
            });
        this.draw=false
      }
    },
  },
  
  created() {
    this.$store.commit('restartHistorial');
  }
   
};
</script>