<template>
    <slider
    id="deslizador"
    :interval="10000"
    :speed="3000"
    :control-btn="false"
    :stopOnHover="false"
    animation="fade"
    :indicators="false"
    style="margin-top:47px!important;">
        <slider-item
            v-for="(i, index) in list"
            :key="index"
            :style="i"
            @click="hello"
        >
            <b-row class="ml-0" align-v="center" style="position:absolute!important; bottom: 0px; width:100%;    background: linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.8) 90%);">
                <b-col>
                    <p class="tituloImagen" style=" font-size: 4.2rem; text-align: left; position:relative; color:#FFF!important;margin-bottom: 0px; -moz-user-select: none!important; -khtml-user-select: none!important; -webkit-user-select: none!important;">{{i.titulo}}</p>
                    <p class="subtituloImagen" style=" font-size: 11px; text-align: left; position:relative; color:#FFF!important; -moz-user-select: none!important; -khtml-user-select: none!important; -webkit-user-select: none!important;">{{i.subtitulo}}</p>
                </b-col>
            </b-row>
            <div class="fill">
                <img :src="require(`../editor/img/portadas/${index + 1}.jpg`)" alt="" srcset="" class="unaImagen">
            </div>
        </slider-item>
    </slider>
</template>

<script>
export default {
    data(){
        return{
            list: [
                { backgroundColor: '#e53935', width: '100%', height: '100%', titulo: 'Imagen fresca y diferente', subtitulo: 'Nuestro norte es hacernos destacar entre el resto' },
                { backgroundColor: '#ef9a9a', width: '100%', height: '100%', titulo: 'Diseños personalizados', subtitulo: 'Tu gusto - Tus diseños - Nuestro servicio' },
                { backgroundColor: '#ef5350', width: '100%', height: '100%', titulo: 'Satisfacción garantizada', subtitulo: 'Nos enfocamos en la calidad de atención' },
                { backgroundColor: '#b71c1c', width: '100%', height: '100%', titulo: 'Entregas en todo Santiago', subtitulo: 'Posibilidad de entrega en todo Santiago' }
            ],
        }
    },
    methods:{
        hello(){
          ///////////////////////////////////////////////////////////////////////////////////////////////
         ///  SOY EL TU DEL PASADO, DEJA DE BORRAR ESTA FUNCION, QUE SI TIENE UTILIDAD... PAYASO...  ///
        ///////////////////////////////////////////////////////////////////////////////////////////////
        }
    }
}
</script>

<style>
.unaImagen {
    background-size: cover!important;
    background-repeat: no-repeat!important;
    background-position: 50%!important;
    width: 100%!important;
    height:100%!important;
}
.fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}
.fill > img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
}
.tituloImagen, .subtituloImagen{
    text-shadow: 4px 4px 9px rgb(122, 122, 122);
}
#deslizador{
    margin-left: 0px!important;
    margin-right: 0px!important;
}
/* ModalTerminosCondiciones */
.card-img,
.productoCard {
    border-radius: 15px!important;
}
#modal_2___BV_modal_content_,
#modal-mensaje___BV_modal_content_,
#ModalTerminosCondiciones___BV_modal_content_,
#modal_1___BV_modal_content_,
#modal_ingreso___BV_modal_content_,
#modal_registro___BV_modal_content_,
#ModalCarroCompras___BV_modal_content_,
#modalProducto___BV_modal_content_ {
    border-radius: 15px!important;
    /* background-color: #272727!important; */
    border-width: 0px!important;
}

#modal_2___BV_modal_header_,
#modal-mensaje___BV_modal_header_,
#ModalTerminosCondiciones___BV_modal_header_,
#modal_1___BV_modal_header_,
#modal_ingreso___BV_modal_header_,
#modal_registro___BV_modal_header_,.card-img-top,
#modalProducto___BV_modal_header_ {
    border-top-left-radius: 10px!important;
    border-top-right-radius: 10px!important;
}

/* @media(min-width:1200px){
    .productoCard > img {
        height:277px!important;
        width: 263px!important;
    }
    .productoCard {
        width: 265px!important;
        margin:10px!important;
    }
    .card-title{
        font-size: 16px !important;
    }
    .unPrecio, .etiquetaBajo {
        font-size: 14px!important;
    }
    .etiquetaBajo {
        margin-bottom: 0px!important;
    }
    .tituloImagen{
        font-size: 40px!important;
    }
    .subtituloImagen{
        font-size: 25px!important;
        margin-bottom: 10px!important;
    }
    #deslizador{
        height: 500px!important;
    }
    .unPrecio, .numLikes { font-size:15px!important; }
    .imgLike { 
        height:17px!important;
        width:17px!important;
    }
    .prodcto{ height:25px!important; }
}
@media(min-width:992px) and (max-width:1199px){
    .productoCard > img {
        height:240px!important;
        width: 224px!important;
    }
    .productoCard {
        width: 226px!important;
        margin:6.5px!important;
    }
    .card-title{
        font-size: 14px !important;
    }
    .unPrecio, .etiquetaBajo {
        font-size: 13px!important;
    }
    .etiquetaBajo {
        margin-bottom: 1px!important;
    }
    .tituloImagen{
        font-size: 40px!important;
    }
    .subtituloImagen{
        font-size: 25px!important;
    }
    #deslizador{
        height: 400px!important;
    }
    .unPrecio, .numLikes { font-size:15px!important; }
    .imgLike { 
        height:17px!important;
        width:17px!important;
    }
    .prodcto{ height:22px!important; }
}
@media(min-width:768px) and (max-width:991px){
    .productoCard > img {
        height:230px!important;
        width: 217px!important;
    }
    .productoCard {
        width: 219px!important;
        margin:10.5px!important;
    }
    .card-title{
        font-size: 14px !important;
    }
    .unPrecio, .etiquetaBajo {
        font-size: 13px!important;
    }
    .etiquetaBajo {
        margin-bottom: 1px!important;
    }
    .tituloImagen{
        font-size: 30px!important;
    }
    .subtituloImagen{
        font-size: 18px!important;
    }
    #deslizador{
        height: 320px!important;
    }
}
@media(min-width:576px) and (max-width:767px){
    .productoCard > img {
        height:260px!important;
        width: 247px!important;
    }
    .productoCard {
        width: 249px!important;
        margin:10.5px!important;
    }
    .card-title{
        font-size: 14px !important;
    }
    .unPrecio, .etiquetaBajo {
        font-size: 14px!important;
    }
    .etiquetaBajo {
        margin-bottom: 0px!important;
    }
    .tituloImagen{
        font-size: 25px!important;
    }
    .subtituloImagen{
        font-size: 15px!important;
    }
    #deslizador{
        height: 260px!important;
    }
    .tituloCard{
        font-size:15px!important;
    }
    .unPrecio, .numLikes { font-size:15px!important; }
    .imgLike { 
        height:17px!important;
        width:17px!important;
    }
    .prodcto{ height:25px!important; }
}
@media(min-width:480px) and (max-width: 575px) {
    .productoCard > img {
        height:230px!important;
        width: 217!important;
    }
    .productoCard {
        width: 219px!important;
        margin:10px!important;
    }
    .card-title{
        font-size: 14px !important;
    }
    .unPrecio, .etiquetaBajo {
        font-size: 12px!important;
    }
    .etiquetaBajo {
        margin-bottom: 4px!important;
    }
    #contenedorInicio{
        width: 460px!important;
    }
    .tituloImagen{
        font-size: 12px!important;
    }
    .subtituloImagen{
        font-size: 13px!important;
    }
    #deslizador{
        height: 255px!important;
        margin-left: 0px!important;
        margin-right: 0px!important;
    }
    #contenedorInicio{
        width: 100%!important;
        margin-left: 0px!important;
        margin-right: 0px!important; 
    }
    .unPrecio, .numLikes {
        font-size:13px!important;
    }
}
@media(min-width:410px) and (max-width: 479px) {
    .productoCard > img {
        height:200px!important;
        width: 186!important;
    }
    .productoCard {
        width: 188px!important;
        margin:8px!important;
    }
    .card-title{
        font-size: 14px !important;
    }
    .unPrecio, .etiquetaBajo {
        font-size: 12px!important;
    }
    .etiquetaBajo {
        margin-bottom: 4px!important;
    }
    #contenedorInicio{
        width: 390px!important;
    }
    .tituloImagen{
        font-size: 20px!important;
    }
    .subtituloImagen{
        font-size: 12px!important;
    }
    #contenedorInicio, .container{
        padding-left: 0px!important;
        padding-right: 0px!important;
    }
    #deslizador{
        height: 210px!important;
        margin-left: 0px!important;
        margin-right: 0px!important;
    }
    #contenedorInicio{
        width: 100%!important;
        margin-left: 0px!important;
        margin-right: 0px!important; 
    }
    .tituloCard{
        font-size:12px!important;
    }
    .unPrecio, .numLikes {
        font-size:11px!important;
    }
    .imgLike { 
        height:13px!important;
        width:13px!important;
    }
    .prodcto{
        height:22px!important;
    }
}
@media(min-width:351px) and (max-width: 409px) {
    .productoCard > img {
        height:186px!important;
        width: 173px!important;
    }
    .productoCard {
        width: 175px!important;
        margin:5px!important;
    }
    .card-title{
        font-size: 12px !important;
    }
    .unPrecio, .etiquetaBajo {
        font-size: 12px!important;
    }
    .etiquetaBajo {
        margin-bottom: 4px!important;
    }
    #contenedorInicio{
        width: 340px!important;
    }
    .tituloImagen{
        font-size: 18px!important;
    }
    .subtituloImagen{
        font-size: 12px!important;
    }
    #deslizador{
        height: 200px!important;
        margin-left: 0px!important;
        margin-right: 0px!important;
    }
    #contenedorInicio{
        width: 100%!important;
        margin-left: 0px!important;
        margin-right: 0px!important; 
    }
    .unPrecio, .numLikes {
        font-size:11px!important;
    }
    .imgLike { 
        height:13px!important;
        width:13px!important;
    }
    .prodcto{
        height:20px!important;
    }
}
@media(max-width:350px) {
    .productoCard > img {
        height:270px!important;
        width: 253px!important;
    }
    .productoCard {
        width: 255px!important;
        margin:9px!important;
    }
    .card-title{
        font-size: 12px !important;
    }
    .unPrecio, .etiquetaBajo {
        font-size: 12px!important;
    }
    .etiquetaBajo {
        margin-bottom: 4px!important;
    }
    #contenedorInicio{
        width: 100%!important;
        margin-left: 0px!important;
        margin-right: 0px!important; 
    }
    .tituloImagen{
        font-size: 14px!important;
    }
    .subtituloImagen{
        font-size: 10px!important;
    }
    #deslizador{
        height: 140px!important;
        margin-left: 0px!important;
        margin-right: 0px!important; 
    }
    .imgLike { 
        height:15px!important;
        width:15px!important;
    }
    .prodcto{
        height:23px!important;
    }
} */
</style>