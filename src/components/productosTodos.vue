<template>
<div>
    <b-container class="pt-2 pb-2 text-left">
        <b-button size="sm" variant="dark" @click="seleccionarPestana(0)" class="mr-2 ml-2">
            PRODUCTOS
        </b-button>
        <b-button size="sm" variant="dark" @click="seleccionarPestana(1)" class="mr-2">
            CATEGORIAS
        </b-button>
        <b-button size="sm" variant="dark" @click="seleccionarPestana(2)">
            COLORES
        </b-button>
    </b-container>

    <b-container class="pl-1 pr-1 pb-1" :hidden="pestanaProductos">
        <h4 class="mt-2 mb-2" style="display: inline-block!important;padding-top:3px!important;">Productos</h4>
        <b-button class="mt-2 mb-2 mr-2" size="sm" variant="outline-dark" style="display: inline-block!important;float:right!important;" @click="modalProducto('')">
            Nuevo
            <b-icon icon="plus"></b-icon>
        </b-button>
        <div class="table-responsive mb-0">
            <table class="table table-sm table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="Producto in productosTodos" :key="Producto.idProducto">
                        <td nowrap class="text-left">{{Producto.nombre}}</td>
                        <td nowrap class="text-right">{{Producto.precio | currency}}</td>
                        <td nowrap class="text-center">
                            <a href="#" style="font-size:12px; height:19px!important; width:64px!important;" class="papelera btn btn-outline-danger" @click="eliminarProducto(Producto)">
                               ELIMINAR
                            </a>
                            <a href="#" style="font-size:12px; height:19px!important; width:64px!important;" class="papelera ml-1 btn btn-outline-dark" @click="editarProducto(Producto._id, Producto)">
                               EDITAR
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </b-container>

    <b-container class="pl-1 pr-1 pb-1" :hidden="pestanaCategorias">
        <h4 class="mt-2 mb-2" style="display: inline-block!important;padding-top:3px!important;">Categorías</h4>
        <b-button class="mt-2 mb-2 mr-2" size="sm" @click="modalCategoria('','')" variant="outline-dark" style="display: inline-block!important;float:right!important;">
            Nuevo
            <b-icon icon="plus"></b-icon>
        </b-button>
                <div class="table-responsive mb-0">
            <table class="table table-sm table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre Categoría</th>
                        <th scope="col">ID</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="categoria in categoriasTodas" :key="categoria._id">
                        <td nowrap class="text-left">{{ categoria.nombre }}</td>
                        <td nowrap class="text-left">{{ categoria._id }}</td>
                        <td nowrap class="text-center">
                            <a href="#" style="font-size:12px; height:19px!important; width:64px!important;" class="papelera btn btn-outline-danger" @click="eliminarCategoria(categoria._id, categoria.nombre)">
                               ELIMINAR
                            </a>
                            <a href="#" style="font-size:12px; height:19px!important; width:64px!important;" class="papelera ml-1 btn btn-outline-dark" @click="modalCategoria(categoria._id, categoria.nombre)">
                               EDITAR
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </b-container>

    <b-container class="pl-1 pr-1 pb-1" :hidden="pestanaColores">
        <h4 class="mt-2 mb-2" style="display: inline-block!important;padding-top:3px!important;">Colores</h4>
        <b-button class="mt-2 mb-2 mr-2" size="sm" @click="modalColores('','')" variant="outline-dark" style="display: inline-block!important;float:right!important;">
            Nuevo
            <b-icon icon="plus"></b-icon>
        </b-button>
                <div class="table-responsive mb-0">
            <table class="table table-sm table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apariencia Color</th>
                        <th scope="col p-0">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="color in colores" :key="color._id">
                        <td nowrap class="text-left">{{ color.nombre }}</td>
                        <td nowrap class="text-center">
                            <div class="cuadro" :style="{backgroundColor:color.codigo}"></div>
                        </td>
                        <td nowrap class="text-center w-25">
                            <a href="#" style="font-size:12px; height:19px!important; width:64px!important;" class="papelera btn btn-outline-danger" @click="eliminarColor(color._id, color.nombre)">
                               ELIMINAR
                            </a>
                            <a href="#" style="font-size:12px; height:19px!important; width:64px!important;" class="papelera ml-1 btn btn-outline-dark" @click="modalColores(color._id, color.nombre, color.codigo)">
                               EDITAR
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </b-container>

    <Modal ref="modalCategoria" :tituloModal="titulo" :textoModal="texto"></Modal>
    <ModalColores ref="modalColores" :tituloModal="titulo" :textoModal="texto"></ModalColores>
    <ModalProducto ref="modalProducto" :ElTituloModal="tituloProductoModal" :producto="unSoloProducto" :idProducto="idProducto"></ModalProducto>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import axios from 'axios'
import Modal from './modals/ModalNuevaCategoria'
import ModalColores from './modals/ModalColores'
import ModalProducto from './modals/modalProducto'
import { mapMutations, mapState } from 'vuex'

// let url = 'http://localhost:3000/'
// let url = 'https://storeapp-back-end.herokuapp.com/'
// let url = 'https://cosmic-envoy-301012.rj.r.appspot.com/'

// var firebaseConfig = {
//   apiKey: "AIzaSyDIXGU3z6fJ9a5ZeJDvU8Xf5e0crQE6pp8",
//   authDomain: "storeappfront-465d5.firebaseapp.com",
//   databaseURL: "https://storeappfront-465d5.firebaseio.com",
//   projectId: "storeappfront-465d5",
//   storageBucket: "storeappfront-465d5.appspot.com",
//   messagingSenderId: "848968631781",
//   appId: "1:848968631781:web:cb89a966c6d63eaa521b0c",
//   measurementId: "G-ELJPFXFTRV"
// };



var firebaseConfig = {
    apiKey: "AIzaSyBpTsy5md5SPoZMWuA0ecRcBDo8SXwwtOg",
    authDomain: "meatiende.firebaseapp.com",
    projectId: "meatiende",
    storageBucket: "meatiende.appspot.com",
    messagingSenderId: "903066046395",
    appId: "1:903066046395:web:4ba6066a047586fb7cbe9e"
};

firebase.initializeApp(firebaseConfig)

export default {
    name:'productosTodos',
    metaInfo:{
        titleTemplate: '%s - ADMINISTRACIÓN'
    },
    components:{
        Modal,
        ModalProducto,
        ModalColores
    },
    data(){
        return{
            productosTodos:[],
            categoriasTodas:[],
            unSoloProducto:undefined,
            idProducto:String,
            Total:Number,
            titulo:'',
            tituloProductoModal:'',
            texto:'',
            pestanaProductos:false,
            pestanaCategorias:true,
            pestanaColores:true,
        }
    },
    computed:{
        ...mapState(['categorias','productosTodos_', 'colores', 'url', 'urlProductos'])
    },
    mounted(){
        this.traerProductosTodos('')
        this.traerCategorias()
        this.traerColores()
    },
    methods:{
        ...mapMutations(['traerCategorias', 'traerProductosTodos', 'traerColores']),
        clickSelect(){
        // console.log(document.querySelector('#selectColor'))
        document.getElementById('selectColor').getElementsByTagName('option').forEach( el => {
            if(el.value === "#ffffff-Blanco") {
            el.setAttribute('selected', true)
            return
            }
        })
        },
        seleccionarPestana(dato){
            switch (dato) {
                case 0:
                    this.pestanaProductos = false
                    this.pestanaCategorias = true
                    this.pestanaColores = true
                    break;
                case 1:
                    this.pestanaProductos = true
                    this.pestanaCategorias = false
                    this.pestanaColores = true
                    break;
                case 2:
                    this.pestanaProductos = true
                    this.pestanaCategorias = true
                    this.pestanaColores = false
                    break;
            }
        },
        modalProducto(producto){
            this.tituloProductoModal = 'Nuevo Producto'
            this.unSoloProducto = {
                nombre: '',
                descripcion: '',
                categoria: '',
                precio: '',
                cantidad: '',
                nombreImags: '',
                nombreImagenes: [],
                aplicaDescuento: false,
                idProducto:'',
                descuento:{
                    desde: '',
                    hasta:'',
                    tipoPorcentaje:true,
                    tipoMonto:false,
                    montoDescuento:'',
                    porcentajeDescuento:''
                }
            }
            this.$refs.modalProducto.arrayImagenes = []
            this.$refs.modalProducto.arrayImagenes_ = []
            this.$refs.modalProducto.show = true
            this.$refs.modalProducto.activoVer = true
            this.$refs.modalProducto.activoBtnRegistrar = true
            this.$refs.modalProducto.descuentoHabilitado = true
            this.$refs.modalProducto.RegistroEdicion = ''
            this.$bvModal.show('modalProducto')
        },
        eliminarProducto(producto){
            var elimProd = confirm(`¿Esta seguro de eliminar el producto '${producto.nombre}'?`);
            const datos = {
                _id:producto._id
            }
            if(elimProd){
                // const referencia = firebase.storage().ref().child(`/productos/${producto._id}`)
                // referencia.listAll().then(function(resp){
                //     const vaina = resp._delegate.items.map(function(el){
                //         // console.log(el)

                //         // el.getDownloadURL().then(function(result){
                //         //     console.log(result);
                //         // });
                //         return `https://firebasestorage.googleapis.com/v0/b/storeappfront-465d5.appspot.com/o/${el._location.path_}`
                //     })
                //     console.log(vaina);
                // })
                // return;
                axios.post(`${this.url}eliminarProducto`, datos).then(function(result){
                    this.traerProductosTodos('')
                        var imgReferencias = firebase.storage().ref().child(`/productos/${producto._id}`)
                        imgReferencias.listAll().then(function (result) {

                        if(result.items.length > 0){
                            result.items.forEach(function (file) {
                                file.delete();
                            })
                        } 
                    });
                }.bind(this));
            }
        },
        async editarProducto(id, producto){
            // console.time()            
            const getImagenes = () => {
                return new Promise((resolve, reject) => {
                    let unArreglo_ = []
                    producto.nombreImagenes.forEach(function(el, index){
                        axios.get((`${this.urlProductos}${el}`).replace(/\ /g, '%20') , {responseType:'blob'}).then(function(resp){
                            let file = new File([resp.data], `${index}.jpg`, { type: 'image/jpeg' });
                            unArreglo_.push(file)
                        });
                    }.bind(this));

                    resolve(unArreglo_)                   
                })
            }

            getImagenes().then(function(respPromesa){
                console.log(respPromesa);
                this.$refs.modalProducto.arrayImagenes = respPromesa
                this.tituloProductoModal = 'Editar Producto'
                this.unSoloProducto = producto
                this.idProducto = id
                this.$bvModal.show('modalProducto')
            }.bind(this));
            // console.timeEnd();
            

            return


            let unArreglo_ = []
            producto.nombreImagenes.forEach(function(el, index){
                axios.get((`${this.urlProductos}${el}`).replace(/\ /g, '%20') , {responseType:'blob'}).then(function(resp){
                    let file = new File([resp.data], `${index}.jpg`, { type: 'image/jpeg' });
                    unArreglo_.push(file)
                });
            }.bind(this));
        },
        modalCategoria(id, nombre){
            if(id != ''){
                this.titulo = `Editar Categoría`;
                this.$refs.modalCategoria.form.nombre = nombre
                this.$refs.modalCategoria.form.idCategoria = id
                this.$refs.modalCategoria.desactivado = false                     
            }
            else{
                this.titulo = `Nueva Categoría`;
                this.$refs.modalCategoria.form.nombre = ''
                this.$refs.modalCategoria.desactivado = true
            }
            
            this.$bvModal.show("modalNuevaCategoria");
        },
        eliminarCategoria(id, nombre){
            var confirmar = confirm(`¿Está seguro de eliminar la categoría ${nombre} de sistema?`)
            if(confirmar){
                axios.post(`${this.url}eliminarCategoria`, { id:id }).then(function(resp){
                    axios.get(`${this.url}traerCategorias`).then(function (resp) {
                        this.categoriasTodas = resp.data
                    }.bind(this));
                }.bind(this));
            }
        },
        modalColores(id, nombre, codigo){
            if(id != ''){
                this.titulo = `Editar Color`;
                this.$refs.modalColores.form.nombre = nombre
                this.$refs.modalColores.form.id = id
                this.$refs.modalColores.form.codigo = codigo
                this.$refs.modalColores.desactivado = false                     
            }
            else{
                this.titulo = `Nuevo Color`;
                this.$refs.modalColores.form.nombre = ''
                this.$refs.modalColores.form.codigo = '#ffffff'
                this.$refs.modalColores.desactivado = true
            }
            this.$bvModal.show("modalColores")
        },
        eliminarColor(id, nombre){
            var confirmar = confirm(`¿Está seguro de eliminar el color "${nombre}"?`)
            if(confirmar){
                axios.post(`${this.url}eliminarColor`, { id:id }).then(function(resp){
                    if(resp.data === ""){
                        this.traerColores()
                    }
                    else{
                        alert(resp.data)
                    }
                }.bind(this))
            }
        },
    },
    watch:{
        categorias(nuevo){
            this.categoriasTodas = nuevo
        },
        productosTodos_(nuevo){
            this.productosTodos = nuevo
        }
    }
}
</script>

<style>
.cuadro{
    height:20px;
    border: solid 1px #000!important;
}
</style>