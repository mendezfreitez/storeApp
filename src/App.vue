<template>
  <div id="app" style="width:100%!importaant;">
    <BarraLateral />
    <router-view style="padding-top:0px!important;" />
  </div>
</template>

<script>
// import firebaseConfiguracion from './assets/js/FirebaseConfig'
import 'typeface-dosis'
import { mapMutations } from 'vuex'
import Navegador from './components/Navegador'
import BarraLateral from './components/BarraLateral'
import Footer from './components/Footer'
require('./editor/css/queriesProducto.css')

export default {
  metaInfo:{
    title: "SomosFútbol",
    titleTemplate: '%s - INICIO'
  },
  components:{
    Navegador, BarraLateral, Footer
  },
  methods:{
    ...mapMutations(['getUsuario', 'traerColores'])
  },
  mounted(){
    this.getUsuario();
    this.traerColores();
  }
}
</script>

<style>
  #app {
    width: 100%!important;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
  body{
    background-color: transparent!important;
    padding-left: 0px!important;
    padding-right: 0px!important;
  }
  html{
    background-color: #bcddd839!important;
    padding-left: 0px!important;
    padding-right: 0px!important;
    size:20px!important;




/* background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 20 20'%3E%3Cg %3E%3Cpolygon fill='%23dbdbdb' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%23dbdbdb' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E"); */
  }
  h4, h5{
    font-family: 'OverpassLight'; font-weight:700!important;
  }
</style>
