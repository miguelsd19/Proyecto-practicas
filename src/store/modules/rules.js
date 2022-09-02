export default {
    namespaced: true,
    state: {
        rules: {
            required: [(value) => !!value || "requerido"],
            email: [(value) => !!value || "requerido",
                (value) => /.+@.+/.test(value) || 'El email no es valido',
                (value) => String(value).length >= 5 || 'El numero debe de ser al menos 6 digitos'
            ],
            phone: [(value) => !!value || "requerido",
                (value) => value.length == 10 || 'El numero debe de ser de 10 digitos'
            ],
            date: [(value) => !!value || "requerido",
                (value) => value.length === 10 || 'El numero debe de ser de 11 digitos'
            ],
            description: [(value) => !!value || "requerido",
                (value) => value.length > 9 || 'La descripcion debe de ser al menos 10 letras'
            ],
            name: [(value) => !!value || "requerido",
                (value) => value.length > 4 || 'La descripcion debe de ser al menos 5 letras'
            ],
            password: [(value) => !!value || "requerido",
                (value) => value.length > 4 || 'La contraseña debe ser de al menos 5 caracteres'
            ],
            conceptoRules: [
                (v) => !!v || "concepto necesario",
            ],
            cuentaRules: [
                (v) => !!v || "cuenta requerida",
            ],
            cantidadRules: [
                (v) => !!v || "cantidad requerida",
                (v) => (v && v.length > 2 && v.length < 12) || "cantidad no valida",
            ],
        },

        rulesClientes: {
            nameRules: [
                (v) => !!v || "nombre necesario",
                (v) =>
                (v && v.length > 4 && v.length < 51) ||
                "El nombre no es valido",
            ],
            calleRules: [
                (v) => !!v || "nombre de la calle necesario",
                (v) =>
                (v && v.length > 3 && v.length < 51) ||
                "El nombre de la calle no es valido",
            ],
            numberRules: [
                (v) => !!v || "numero exterior requerido",
                (v) =>
                (v && v.length > 1 && v.length < 9) || "numero exterior no valido",
            ],
            colRules: [
                (v) => !!v || "nombre de la colonia necesario",
                (v) =>
                (v && v.length > 3 && v.length < 51) ||
                "El nombre de la colonia no es valido",
            ],
            cpRules: [
                (v) => !!v || "codigo postal requerido",
                (v) => (v && v.length > 3 && v.length < 10) || "codigo no valido",
            ],
            cityRules: [
                (v) => !!v || "nombre de la ciudad necesario",
                (v) =>
                (v && v.length > 4 && v.length < 51) ||
                "El nombre de la ciudad no es valido",
            ],
            muniRules: [
                (v) => !!v || "nombre del municipio",
                (v) =>
                (v && v.length > 3 && v.length < 51) ||
                "El municipio no es valido",
            ],
            tel1Rules: [
                (v) => !!v || "numero de telefono requerido",
                (v) => (v && v.length > 7 && v.length < 14) || "telefono no valido",
            ],
            tel2Rules: [
                (v) => {
                    if (v !== "" && v !== null) {
                        if (v.length < 7 || v.length > 14) {
                            return "telefono no valido"
                        }
                    }
                    return true;
                }
            ],
            rfcRules: [
                (v) => !!v || "RFC necesario",
                (v) =>
                (v && v.length > 11 && v.length < 14) ||
                "RFC no es valido",
            ],
            curpRules: [
                (v) => !!v || "CURP necesario",
                (v) => (v && v.length == 18) || "CURP no es valido",
            ],

        }


    },
    Mutations: {
        setRules(state, payload) {
            state.rules = payload;
        }
    },
}