<script>
    
    import axios from "axios"
  import { BASEURLweb } from "../../assets/ApiRutas";
    import {onMount} from "svelte" //carga pagina acciones
    import {navigate} from "svelte-routing"
    import {estudianteEdit} from "../../assets/store"
//areglo vacio
    let datos = []

    const getNotas = async () =>{
        const response = await axios.get(BASEURLweb + "/notas")
        datos = response.data
        console.log (response.data) 
    }

    onMount(()=> {
        getNotas()
    })

    //button
    const buttonNuevo = ()=>{
        navigate("/notas/new")
    }

    const buttonEdit =(nota) =>{
        estudianteEdit.set(nota)
        navigate("/notas/edit")
        return undefined
    }

    const buttonDelete = async (cedula) =>{
        try {
            const confirmacion = window.confirm("¿Está seguro de eliminar esta Nota?")
            
            if (confirmacion){
                const response = await axios.delete(BASEURLweb+"/notas/"+cedula)
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
            <h3>Tabla de Notas</h3>
            <div class="max"></div>
            <button on:click={buttonNuevo} class="border">
                <span class="material-symbols-outlined" > add_circle </span>
            </button>
            
        </nav>
        <table class="border">
            <thead>
                <tr>
                <th>Cédula</th>
                <th>Nota Proyectos</th>
                <th>Nota Deberes</th>
                <th>Nota Examen</th>
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
                    {#each datos as nota }
                        <tr>
                            <td>{nota.not_est_cedula}</td>
                            <td>{nota.not_proyectos}</td>
                            <td>{nota.not_deberes}</td>
                            <td>{nota.not_examen}</td>
                            <td>
                                <button class="transparent square" on:click={buttonEdit(nota)}>
                                    <i class="material-symbols-outlined"> edit </i> 
                                </button> 
                                <button class="transparent square" on:click={onDeleteClick(event,nota.not_est_cedula)}>
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

</style>