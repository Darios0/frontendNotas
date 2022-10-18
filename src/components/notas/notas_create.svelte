<script>
    // trabajar con apis 
    import axios from "axios"
    import {BASEURLweb} from "../../assets/ApiRutas"
    import {navigate} from "svelte-routing" // visualizacion general

    let formNota ={
        cedula: "",
        proyectos:"",
        deberes:"",
        examen: ""
    }

    const crearNota = async () =>{
        console.log(formNota)
        
        try {
            const response = await axios.post(BASEURLweb+ "/notas",formNota)
            if (response.status == 201){
                alert("Proceso realizado correctamente")
                navigate("/notas")
            }
            
        } catch (error) {
            console.error(error.response)
        }

    }
</script>

<main class="padding-titulo">
  <div class="fluid">
    <nav class="padding-titulo">
      <h3>Nuevas Notas</h3>
    </nav>
    <div>
      <div class="field label border">
        <input type="text" id="cedula" bind:value={formNota.cedula}/>
        <label for="cedula">Cedula</label>
      </div>
      <div class="field label border">
        <input type="text" id="proyectos" bind:value={formNota.proyectos} />
        <label for="proyectos">Nota Proyectos</label>
      </div>
      <div class="field label border">
        <input type="text" id="deberes" bind:value={formNota.deberes}>
        <label for="deberes">Nota Deberes</label>
      </div>
      <div class="field label border">
        <input type="text" id="examen" bind:value={formNota.examen}>
        <label for="examen">Nota Examen</label>
      </div>
      <button on:click={crearNota}>
        Añadir Notas
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