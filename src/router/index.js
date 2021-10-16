import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../components/Inicio'
import NuevoProducto from '../components/NuevoProducto'
import ListaProductos from '../components/ListaProductos'
import productosTodos from '../components/productosTodos'
import Personalizar from '../components/personalizaTuCamiseta'
import axios from 'axios'

const url = 'https://storeapp-back-end.herokuapp.com/'
// const url = 'http://localhost:3000/'
const config = {
  'content-Type': 'application/json',
  headers: {
      'x-access-token': localStorage.getItem('token')
  }
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/NuevoProducto',
    name: 'NuevoProducto',
    component: NuevoProducto
  },
  {
    path:'/ListaProductos',
    name:'ListaProductos',
    component:ListaProductos
  },
  {
    path: '/admin',
    name: 'admin',
    component: productosTodos,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')){
        alert('¡No estás logueado!');
        next({ name: 'Inicio' })
      }
      else{
        axios.get(`${url}admin`, config).then(resp => {
          console.log(resp.data)
          if(resp.data){
            next()
          }
          else{
            alert('No tienes permisos de administrador!!!')
            next({ name: 'Inicio' })
          }
        })
      }
    }
  }, 
  {
    path: '/personalizado',
    name: 'personalizado',
    component: Personalizar      
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})


export default router
