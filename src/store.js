import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nombreCategoria:'INICIO',
    likeProductos: [],
    esVisible:true,
    ProductosCarro: [],
    cantidadCarro: 0,
    session: undefined,
    sesionUsuario: "",
    textoTotalCarro: "",
    categorias: [],
    colores: [],
    productosTodos_: [],
    productosTodos: [],
    urlProductos: 'https://firebasestorage.googleapis.com/v0/b/meatiende.appspot.com/o/productos%2F',
    // url: 'https://cosmic-envoy-301012.rj.r.appspot.com/', /////////// ESTA NO SE USA PERO SE MANTIENE ACÁ, NO LA VAYAAS A BORRAR, PAYASO...
    // url: 'http://localhost:3000/',
    url: 'https://storeapp-back-end.herokuapp.com/', //////////////// NOS PASAMOS A ESTA
  },
  mutations: {
    setNombreCategoria(state, nombre){
      state.nombreCategoria = nombre;
    },
    setLikeProductos(store, idProducto){
      if(idProducto === undefined){
        let token = localStorage.getItem('token')
        if(token){
          store.likeProductos = JSON.parse(localStorage.getItem('likesUsuario'))
        }
        else{
          store.likeProductos = JSON.parse(localStorage.getItem('likes'))
        }
        return
      }

      var exist = store.likeProductos.filter((el) => { return el === idProducto })

      if (exist.length > 0) store.likeProductos.splice(store.likeProductos.indexOf(idProducto), 1)
      else store.likeProductos.push(idProducto) 

      var token = localStorage.getItem('token')
      
      if (token) localStorage.setItem('likesUsuario', JSON.stringify(store.likeProductos))
      else localStorage.setItem('likes', JSON.stringify(store.likeProductos))
    },
    modificarCarro(state, productos) {
      state.cantidadCarro = productos.length
      state.ProductosCarro = productos

      const token = localStorage.getItem('token')
      if (token) {
        localStorage.setItem("carroUsuario", JSON.stringify(productos))
      }
      else {
        // localStorage.setItem("cantProductosCarro", productos.length);
        localStorage.setItem("productosCarro", JSON.stringify(productos));
      }
    },
    modifPuraCantidad(state, cant) {
      state.cantidadCarro = cant;
    },
    modifTextoTotalCarro(state, texto) {
      state.textoTotalCarro = texto;
    },
    traerCategorias(state) {
      axios.get(`${state.url}traerCategorias`).then(resp => {
        state.categorias = resp.data;
      });
    },
    traerColores(state) {
      axios.get(`${state.url}traerColores`).then(resp => {
        state.colores = resp.data;
      });
    },
    traerProductosTodos(state, idCategoria) {
      axios.post(`${state.url}traerTodos`, { id: idCategoria }).then(res => {
        console.log(res.data);
        state.productosTodos = res.data;
        state.productosTodos_ = res.data;
      });
    },
    setProductos(state, listaProductos){
      state.productosTodos = listaProductos;
    },
    updateProductosTodos(state, productos) {
      state.productosTodos_ = productos;
    },
    mutarVisible(state, datos) {
      const token = localStorage.getItem('token')
      if (token != null) {
        state.esVisible = false
        state.session = false
        state.sesionUsuario = datos.dataUsuario[0].usuario
        state.ProductosCarro = datos.dataUsuario[0].carro
        state.cantidadCarro = datos.dataUsuario[0].carro.length
        localStorage.setItem("session", datos.dataUsuario[0].usuario)
        if (datos.dataUsuario[0].carro.length > 0) {
          localStorage.setItem("carroUsuario", JSON.stringify(datos.dataUsuario[0].carro))
        }
      }
      else {
        state.esVisible = true
        state.session = true
        state.sesionUsuario = ""
      }
    },
    getUsuario(state) {
      const token = localStorage.getItem('token')
      if (token != null) {
        state.sesionUsuario = localStorage.getItem("session")
        // state.session = true
        if (localStorage.getItem("carroUsuario")) {
          var vaine = JSON.parse(localStorage.getItem("carroUsuario"))
          state.ProductosCarro = vaine
          state.cantidadCarro = (state.ProductosCarro).length
        }
        
        state.esVisible = false
      }
      else {
        // state.session = false
        state.sesionUsuario = ""
        state.esVisible = true
        if (localStorage.getItem("productosCarro")) {
          var vaine = JSON.parse(localStorage.getItem("productosCarro"))
          state.ProductosCarro = vaine
          state.cantidadCarro = (state.ProductosCarro).length
        }
      }
    },
    dropUsuario(state) {
      const config = {
        'Content-Type': 'application/json',
        headers: {
          'x-access-token': localStorage.getItem("token")
        }
      }
      let carroUsuario = JSON.parse(localStorage.getItem("carroUsuario"))
      let likesArray = JSON.parse(localStorage.getItem("likesUsuario"))
      if (carroUsuario === null) {
        carroUsuario = []
      }

      axios.post(`${state.url}guardarCarroUsuario`, { carroUsuario, likesArray }, config).then(function (resp) {
        if (resp.status === 200) {
          sessionStorage.clear()
          localStorage.removeItem("token")
          localStorage.removeItem("session")
          localStorage.removeItem("carroUsuario")
          localStorage.removeItem("likesUsuario")
          state.sesionUsuario = ""
          state.esVisible = true

          if (localStorage.getItem("productosCarro") === null) state.ProductosCarro = []
          else state.ProductosCarro = JSON.parse(localStorage.getItem("productosCarro")) 
          
          if (localStorage.getItem("likes") === null) state.likeProductos = []
          else state.likeProductos = JSON.parse(localStorage.getItem("likes"))

          state.cantidadCarro = (state.ProductosCarro).length
        }
      })
    },
  },
});