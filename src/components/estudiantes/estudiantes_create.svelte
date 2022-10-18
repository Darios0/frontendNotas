<script>
    // trabajar con apis 
    import axios from "axios"
    import {BASEURLweb} from "../../assets/ApiRutas"
    import {navigate} from "svelte-routing" // visualizacion general

    let formEstudiante ={
        cedula: "",
        nombres:"",
        apellidos:"",
        nacimiento: ""
    }

    const crearEstudiante = async () =>{
        console.log(formEstudiante)
        
        try {
            const response = await axios.post(BASEURLweb+ "/estudiantes",formEstudiante)
            if (response.status == 201){
                alert("Proceso realizado correctamente")
                navigate("/estudiantes")
            }
            
        } catch (error) {
            console.error(error.response)
        }

    }
</script>

<main class="padding-titulo">
  <div class="fluid">
    <nav class="padding-titulo">
      <h3>Nuevo Estudiante</h3>
    </nav>
    <div>
      <div class="field label border">
        <input type="text" id="cedula" bind:value={formEstudiante.cedula}/>
        <label for="cedula">Cedula</label>
      </div>
      <div class="field label border">
        <input type="text" id="nombres" bind:value={formEstudiante.nombres} />
        <label for="nombres">Nombres</label>
      </div>
      <div class="field label border">
        <input type="text" id="apellidos" bind:value={formEstudiante.apellidos}>
        <label for="apellidos">Apellidos</label>
      </div>
      <div class="field label prefix border">
        <i>today</i>
        <input type="date" id="nacimiento" bind:value={formEstudiante.nacimiento}>
        <label class="active" for="nacimiento">Fecha de Nacimiento</label>
      </div>
      <button on:click={crearEstudiante}>
        Añadir Estudiante
      </button>
    </div>
  </div>
</main>

<style>
        .padding-titulo{
        padding-top: 2%;
        padding-bottom: 2%;

    }

</style>
