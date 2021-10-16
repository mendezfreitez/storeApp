<template>
  <div>
    <b-modal id="modalColores"
    :title="tituloModal"
    header-bg-variant="dark"
    header-text-variant="light"
    cancel-variant="outline-danger"
    ok-variant="outline-primary"
    ok-title="Guardar"
    cancel-title="Cerrar"
    :ok-disabled="desactivado"
    @ok="guardarColor"
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
            placeholder="Nombre Color"
            name="nombre"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1">
          <b-form-input
            id="input-2"
            v-model="form.codigo"
            type="color"
            required
            @keyup="cambio"
            placeholder="Codigo Color"
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
        codigo:'#FFF',
        id:''
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
    ...mapMutations(['modificarCarro','modifPuraCantidad','traerColores']),
    guardarColor(){
      const config = {
        headers: {'content-type':'application/json'}
      }
      axios.post(`${this.url}nuevoColor`, this.form, config).then(function (resp) {
        this.traerColores()
        this.onReset()
        this.$bvModal.hide("modalColores")
      }.bind(this))
    },
    onReset() {
      // evt.preventDefault();
      this.form.nombre = ''
      this.form.id = ''
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