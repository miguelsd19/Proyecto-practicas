<template>
    <div id="app">
        <v-app id="inspire">
            <v-container class="contenedor" fill-height> 
                <v-layout  justify-center>
                    <v-flex align-self-center>
                        <v-card flat>
                            <v-row align="center" justify="center" id="size">
                            <v-col cols="12">
                            <center>
                                <h3>Selecciona una opción para continuar</h3>
                            </center>
                            </v-col>
                            <v-col cols="4">
                                <v-btn  color="#2a566a" dark block  to="/ClientesLista" class="v-btn">
                                    <v-flex>
                                        <center> <v-icon size="80">mdi-account-multiple</v-icon></center>
                                        <center> <h2>Ver Clientes</h2></center>
                                    </v-flex>
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn  color="#827655" dark block depressed to="/ExpedientesLista">
                                    <v-flex>
                                        <center> <v-icon size="80">mdi-folder</v-icon></center>
                                        <center> <h2>Ver Expedientes</h2></center>
                                    </v-flex>
                                
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn block color="#7b4849" dark x-large depressed to="/EgresosLista">
                                    <v-flex>
                                        <center> <v-icon size="80">mdi-view-list</v-icon></center>
                                        <center> <h2>Egresos</h2></center>
                                    </v-flex>
                                </v-btn>
                            </v-col>
                            <v-col cols="4" align-self="center">
                            
                            <p>
                                Al ingresar a Ver Clientes podrás ver todos los clientes
                                registrados, crear un nuevo cliente o crear un expediente nuevo a un
                                cliente.
                            </p>
                            </v-col>
                            <v-col cols="4" align-self="center">
                                <p>
                            Al ingresar a Ver Expedientes podrás ver todos los expedientes
                            creados, seleccionar uno y editarlo.
                                </p>
                            </v-col>
                            <v-col cols="4" align-self="center">
                            <p align="center">Aqui se pueden crear y ver las polizas de egresos</p>
                            </v-col>
                            </v-row>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-app>
    </div>
</template>
<style scooped>

#size .v-btn{
    height: 200px;
    min-height: 50px;
   
}
.iconS{
    height: 100px;
    min-height: 50px;
}

</style>