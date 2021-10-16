<template>
  <div>
    <b-modal id="modalElimProducto"
    size="md"
    style="border: 0px solid rgba(0, 0, 0, 0.2)!important;"
    title="Ingreso Usuario"
    header-text-variant="light"
    cancel-variant="transparent"
    hide-header
    hide-footer
    cancel-title="Cerrar"
    centered>
      <div>
        <div class="pt-2 pl-3 pr-2 pb-2">
          <p>¿Desea eliminar <b>{{nombre}}</b> de su carro?</p>
            <div class="text-right">
              <b-button style="height:30px!important; width:50px!important;" @click="eliminarProducto" size="sm" class="mr-1" variant="outline-danger">SI</b-button>
              <b-button style="height:30px!important; width:50px!important;" @click="() => { this.$bvModal.hide('modalElimProducto') }" size="sm" class="ml-1" variant="dark">NO</b-button>
            </div>
        </div>
      </div>
    </b-modal>
  </div> 
</template>

<script>
import axios from 'axios'
import ModalRegistro from './ModalRegistroUsuario'
import ModalMensaje from './modalMensaje'
import { mapMutations, mapState } from 'vuex';
export default {
  data(){
    return{
      nombre:'',
      codigo:'',
      form:{
        usuario:'',
        contrasenia:''
      },
      Total:0
    }
  },
  components:{
    ModalRegistro, ModalMensaje
  },
  props:{
        tituloModal:String,
        textoModal:String,
        precio:Number
  },
  computed:{
    ...mapState(['ProductosCarro', 'url'])
  },
  methods:{
    ...mapMutations(['modificarCarro','modifPuraCantidad','modifTextoTotalCarro']),
    eliminarProducto(){
      const productos = this.ProductosCarro.filter(producto => producto.codigo !== this.codigo)
      this.modificarCarro(productos)
      this.$bvModal.hide('modalElimProducto');
    },
    calculoTotalCarro(){
        this.Total = 0
        this.ProductosCarro.map(function(e){
            if(e.descuento){
                this.Total += (e.precio - e.descuento.montoDescuento) * e.laCantidad;
            }
            else{
                this.Total += e.precio * e.laCantidad;
            }
        }.bind(this));
        this.modifTextoTotalCarro(this.Total)
    },
    onSubmit(evt) {
      const config = {
        headers: {'content-type': 'application/json'}
      }
      axios.post(`${this.url}`, this.form, config).then(function(resp){
        if(resp.data.titulo === "Listo!"){
          localStorage.setItem("token", resp.data.token)
          this.$bvModal.hide('modalElimProducto');
        }
      }.bind(this));
    }
  }
}
</script>

<style>
  .modal-body{
    padding: 0px!important;
  }
  .close{
    opacity:1!important;
    font-weight: 900!important;
    font-size: 40px!important;
    padding-top:9px!important; 
    background-color: transparent!important;
  }
  .modal-header{
    border-bottom: 0px!important;
    background-color:#272727!important;
  }
  #modal_ingreso___BV_modal_content_{
    border-width: 0px!important;
  }
  #modal_ingreso___BV_modal_title_{
    padding-top: 5px!important;
  }
  #modalElimProducto___BV_modal_content_{
    border-radius: 10px!important;
  }
  #modalElimProducto > div.modal-dialog-centered {
    width: 344px!important;
    /* width: 100%!important; */
  }
</style>