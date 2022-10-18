<script>
    import axios from "axios"
  import { BASEURLweb } from "../../assets/ApiRutas";
    import {onMount} from "svelte" //carga pagina acciones
    import {navigate} from "svelte-routing"
    import {estudianteEdit} from "../../assets/store"
//areglo vacio
    let datos = []

    const formatoFecha = (fecha) =>{
        let fechaCortada = fecha.slice(0,11)
        return fechaCortada
    }

    const getEstudiantes = async () =>{
        const response = await axios.get(BASEURLweb + "/estudiantes")
        datos = response.data
        console.log (response.data) 
    }

    onMount(()=> {
        getEstudiantes()
    })

    //button
    const buttonNuevo = ()=>{
        navigate("/estudiantes/new")
    }

    const buttonEdit =(estudiante) =>{
        estudianteEdit.set(estudiante)
        navigate("/estudiantes/edit")
        return undefined
    }

    const buttonDelete = async (cedula) =>{
        try {
            const confirmacion = window.confirm("¿Está seguro de eliminar este estudiante?")
            
            if (confirmacion){
                const response = await axios.delete(BASEURLweb+"/estudiantes/"+cedula)
                window.alert(response.data.message)
                location.reload()
            } 
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }

    const onDeleteClick = (e,cedula) => {
        buttonDelete(cedula)
        return undefined 
        }    
</script>

<main>
    <div class="fluid">
        <nav class="padding-titulo">
            <h3>Tabla de estudiantes</h3>
            <div class="max"></div>
            <button on:click={buttonNuevo} class="border">
                <span class="material-symbols-outlined" > add_circle </span>
            </button>
            
        </nav>
        <table class="border">
            <thead>
                <tr>
                <th>Cédula</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha de Nacimiento</th>
                <th>Acciones</th>
                </tr> 
            </thead>
            <tbody>
                {#if (datos.length==0)}
                <tr>
                    <th>Cargando</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                {:else}
                    {#each datos as estudiante }
                        <tr>
                            <td>{estudiante.est_cedula}</td>
                            <td>{estudiante.est_nombres}</td>
                            <td>{estudiante.est_apellidos}</td>
                            <td>{estudiante.est_nacimiento}</td>
                            <td>
                                <button class="transparent square" on:click={buttonEdit(estudiante)}>
                                    <i class="material-symbols-outlined"> edit </i> 
                                </button> 
                                <button class="transparent square" on:click={onDeleteClick(event,estudiante.est_cedula)}>
                                    <i class="material-symbols-outlined"> delete </i> 
                                </button> 
                                
                                
                            </td>
                        </tr>
                        
                    {/each} 
                {/if}
                
            </tbody>
        </table>
    </div>
   

</main>

<style>
    .padding-titulo{
        padding-top: 2%;
        padding-bottom: 2%;

    }

</style>