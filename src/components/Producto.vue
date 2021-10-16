<template>
  <div class="contenedorProducto_" style="display:inline-block; position:relative; cursor:pointer!important; user-select: none;">
    <div class="prodcto" @click="setLike(idProducto, !returnLikeado(idProducto))">
      <img v-if="returnLikeado(idProducto) === true" class="imgLike" src="../assets/heart/heartb.png" style="width:17px; height:17px;" alt="" srcset="">
      <img v-else src="../assets/heart/heart.png" class="imgLike" style="width:17px; height:17px;" alt="" srcset="">
      <span class="numLikes" style="font-family:'OverpassLight'; margin-left:3px; font-size:15px; z-index:20!important;">{{ likes }}</span>
    </div>  

    <b-card
      :img-src="srcImagen"
      img-alt="Imagen"
      img-top
      style="width:16rem; border-radius:10px!important;"
      class="productoCard"
      img-height="260"
      @click="$emit('mostrar-modal', $props)"
    >
      <b-card-title
        class="text-left ml-1 mt-1 mb-0 tituloCard"
        style="font-family: 'OverpassLight';height: 32px; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; font-size:15px;"
      >
        {{tituloProducto}}
      </b-card-title>
      
      <div class="text-right mr-2 mb-1" style="font-size:20px!important">
        <b-badge v-if="!aplicaDescuento" class="pl-1 pr-1 pb-0 text-right unPrecio noSeleccionable" style="background-color:transparent!important;" variant="dark">{{precioProducto | currency}}</b-badge>

        <div v-if="aplicaDescuento">
          <b-badge class="pl-1 pr-1 pb-0 text-right unPrecio noSeleccionable" style="margin-left:30px; float:right; background-color: transparent!important; display:block; text-decoration-line:line-through;">{{precioProducto | currency}} <br> </b-badge>
          <b-badge class="pl-1 pr-1 pb-0 mt-1 text-right etiquetaBajo noSeleccionable" style="margin-left:30px; float:right; background-color: transparent!important; display:block;">{{precioProducto - descuento.montoDescuento | currency}}</b-badge>
        </div>
      </div>

      <b-badge v-if="aplicaDescuento" class="etiquetaDescuento" variant="warning">{{descuento.porcentajeDescuento}}% OFF</b-badge>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
export default {
    name:'Producto',
    props:{
      tituloProducto:String,
      textoProducto:String,
      color:Array,
      bodyProducto:String,
      idProducto:String,
      srcImagen:undefined,
      arrayImagenes:Array,  
      laCantidad:Number,
      precioProducto:Number,
      aplicaDescuento:Boolean,
      descuento:Object,
      likes:Number
    },
    data(){
      return{
        session: undefined
      }
    },
    methods:{
      ...mapMutations(['setLikeProductos']),
      returnLikeado(idProducto){
        let existeLike = this.likeProductos.filter(el => { return (el === idProducto) })

        if (existeLike.length > 0){ return true }
        else { return false }
      },
      setLike(idProducto, likeado){
        this.session = localStorage.getItem("session")
        if(!this.session){
          document.getElementsByClassName('registroIngreso')[0].click()
          return
        }
        const config = {
          headers: {'content-type':'application/json'}
        }
        let token = localStorage.getItem('token');
        if(token){
          this.setLikeProductos(idProducto);
          axios.post(`${this.url}setLikeProducto`, { idProducto, likeado }, config).then(function(resp){
            if(resp.data){
              this.productosTodos.forEach(function(el, index) {
                if(el._id === idProducto) {
                  this.productosTodos[index].likes = resp.data.likes
                }
              }.bind(this))
            }
          }.bind(this));
        }
        else{
          this.setLikeProductos(idProducto);
        }
      }
    },
    computed:{
      ...mapState(['likeProductos', 'url', 'productosTodos'])
    },
    mounted(){
      localStorage.getItem('token') ? this.session = true : false
    }
}
</script>

<style>
  .imgLike { transition: all .1s ease-in-out; }

  .imgLike:hover { transform: scale(1.2); }

  .txtCard{
    height: 50px!important;
  }

  .card-body{
    padding: 0px!important;
    padding-bottom: 0px!important;
  }

  .etiquetaDescuento {
    font-family:'OverpassLight';
    font-size:14px!important;
    position:absolute!important;
    top:0px!important;
    left:0px!important;
    height:25px;
    width:auto!important;
    text-align: center;
    border-top-left-radius: 10px!important;
    padding-left:4px!important;
    padding-right:4px!important;
    padding-top:7px!important;
  }

  .unPrecio{
    font-family: 'OverpassLight';
    width: 50%!important;
    color:#000!important;
  }
  
  .etiquetaBajo{
    font-family: 'OverpassLight';
    width: 50%!important;
    color:#000!important;
  }

  .productoCard {
    -webkit-box-shadow: 3px 3px 4px 1px rgba(0,0,0,0.11);
    -moz-box-shadow: 3px 3px 4px 1px rgba(0,0,0,0.11);
    box-shadow: 3px 3px 4px 1px rgba(0,0,0,0.1);
    z-index: 1!important;
  }

  div.productoCard > img {
    border-top-left-radius: 10px!important;
    border-top-right-radius: 10px!important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }

  .prodcto{
    align-items: center!important;
    z-index: 3;
    display:inline-block;
    position:absolute;
    left:10px;
    bottom:15px;
    padding: 0px 10px;
    border-radius: 12px!important;
  }
</style>