<template>
  <div>
    <b-modal id="modalNuevaCategoria"
    :title="tituloModal"
    header-bg-variant="dark"
    header-text-variant="light"
    cancel-variant="outline-danger"
    ok-variant="outline-primary"
    ok-title="Guardar"
    cancel-title="Cerrar"
    :ok-disabled="desactivado"
    @ok="guardarCategoria"
    centered
    >
      <b-form @reset="onReset" class="m-3">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-1"
            v-model="form.nombre"
            type="text"
            required
            @keyup="cambio"
            placeholder="Nombre Categoría"
            name="nombre"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
  data(){
    return{
      form:{
        nombre:'',
        idCategoria:''
      },
      desactivado:true
    }
  },
  props:{
    tituloModal:'',
    textoModal:''
  },
  computed:{
    ...mapState(['ProductosCarro','categorias', 'url'])
  },
  methods:{
    ...mapMutations(['modificarCarro','modifPuraCantidad','traerCategorias']),
    guardarCategoria(){
      const config = {
        'content-Type': 'application/json',
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
      }
      axios.post(`${this.url}nuevaCategoria`, this.form, config).then(function (resp) {
        alert(resp.data);
        this.traerCategorias();
        this.onReset();
      }.bind(this));
    },
    onReset() {
      this.form.nombre = ''
      this.form.idCategoria = ''
    },
    cambio(){
      if(this.form.nombre != ''){
        this.desactivado = false;
      }
      else{
        this.desactivado = true;
      }
    }
  }
}
</script>

<style>
.modal-body{
  padding: 0px!important;
}
#modalNuevaCategoria___BV_modal_content_{
  border-width: 0px!important;
}
#modalNuevaCategoria___BV_modal_title_{
  padding-top: 3px!important;
}
</style>