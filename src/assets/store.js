import {writable} from "svelte/store"


const estudianteEdit = writable ({
    
    est_cedula: "",
    est_nombres:"",
    est_apellidos: "",
    est_nacimiento: ""
})

const notaEdit = writable ({
    
    not_est_cedula: "",
    not_proyectos:"",
    not_deberes: "",
    not_examen: ""
})
export{estudianteEdit,notaEdit}