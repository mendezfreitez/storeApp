<template>
  <div class="text-center w-100" style="height: auto !important">
    <div class="container fixed-top p-0" style="padding-top: 0px !important">
      <Navegador />
    </div>

    <div class="container" id="contenedorInicio">
      <Deslizador />

      <div :hidden="productosDescuento.length === 0">
        <h3
          id="textoOfertas"
          class="mt-4"
          style="
            font-family: 'OverpassExtraLight';
            -moz-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
          ">
          OFERTAS
        </h3>

        <div v-if="productos.length === 0" class="d-flex justify-content-center">
          <div
            class="spinner-border"
            style="
              margin-bottom: 100px !important;
              margin-top: 80px !important;
              width: 3rem;
              height: 3rem;
              animation: spinner-border 1.5s linear infinite;
              border-width: 7px !important;
              height: 70px;
              width: 70px;
            "
            role="status"
          >
            <span class="visually-hidden"></span>
          </div>
        </div>

        <DeslizadorProductos :losProductos="productos" :hidden="productos.length === 0"/>
      </div>

      <h3
        id="textoNuevo"
        class="mt-4"
        style="
          font-family: 'OverpassExtraLight';
          -moz-user-select: none;
          -khtml-user-select: none;
          -webkit-user-select: none;
        "
      >
        {{ nombreCategoria }}
      </h3>

      <div v-if="productos.length === 0" class="d-flex justify-content-center">
        <div
          class="spinner-border"
          style="
            margin-bottom: 100px !important;
            margin-top: 80px !important;
            width: 3rem;
            height: 3rem;
            animation: spinner-border 1.5s linear infinite;
            border-width: 7px !important;
            height: 70px;
            width: 70px;
          "
          role="status"
        >
          <span class="visually-hidden"></span>
        </div>
      </div>

      <div class="mt-3" :hidden="productos.length === 0">
        <Producto
          v-for="t in productos"
          :key="t._id"
          :arrayImagenes="t.nombreImagenes"
          :srcImagen="`${urlProductos}${t.nombreImagenes[0]}`"
          :precioProducto="t.precio"
          :tituloProducto="t.nombre"
          :textoProducto="t.descripcion.substr(0, 65)"
          :bodyProducto="t.descripcion"
          :laCantidad="1"
          :color="t.color"
          :idProducto="t._id"
          :aplicaDescuento="t.aplicaDescuento"
          :descuento="t.descuento"
          :likes="t.likes"
          @mostrar-modal="mostrarModal"
        />
      </div>
    </div>

    <div :hidden="productos.length === 0" class="container p-0">
      <Footer/>
    </div>

    <Modal ref="elModal" :tituloModal="unProducto.tituloProducto" :textoModal="unProducto.bodyProducto" :precio="unProducto.precioProducto"/>
  </div>
</template>

<script>
import DeslizadorProductos from "./DezlizadorProductos";
import Navegador from "./Navegador";
import Deslizador from "./Deslizador";
import Producto from "./Producto";
import Modal from "./modals/Modal";
import Footer from "./Footer";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Inicio",
  components: {
    Producto,
    Modal,
    Footer,
    Deslizador,
    Navegador,
    DeslizadorProductos,
  },
  data() {
    return {
      productos: [],
      productosDescuento: [],
      unProducto: {},
    };
  },
  computed: {
    ...mapState(["productosTodos", "urlProductos", "nombreCategoria"]),
  },
  created: function () {
    this.traerProductosTodos("");
  },
  methods: {
    ...mapMutations([
      "modifCantProducto",
      "modifPuraCantidad",
      "modificarCarro",
      "traerProductosStore",
      "traerProductosTodos",
      "setLikeProductos",
    ]),
    mostrarModal: function (props) {
      this.$refs.elModal.producto = props;
      // console.log(JSON.stringify(props), null, 2);

      let verImags = new Promise((resolve, reject) => {
        var arreglo = props.arrayImagenes.map((el, index) => {
          return {
            id: index,
            src: `${this.urlProductos}${el}`,
            thumbnail: `${this.urlProductos}${el}`,
          };
        });
        resolve(arreglo);
      });

      verImags.then((resp) => {
        this.$refs.elModal.arrayImagenes = resp;
        this.$bvModal.show("modal_1");
      });

      // this.$refs.elModal.arrayImagenes = props.arrayImagenes.map((el, index) => { return ({ id:index , src:`${this.urlProductos}${el}`, thumbnail:`${this.urlProductos}${el}` }) });
      // this.$bvModal.show("modal_1");
    },
  },
  watch: {
    productosTodos(nuevo) {
      this.productosDescuento = nuevo.filter((el) => {
        if (
          el.aplicaDescuento &&
          (new Date(el.descuento.desde).getTime() / 1000).toFixed(0) <
            (new Date().getTime() / 1000).toFixed(0) &&
          (new Date().getTime() / 1000).toFixed(0) <
            (new Date(el.descuento.hasta).getTime() / 1000).toFixed(0)
        ) {
          return el;
        }
      });
      this.productos = nuevo.filter((el) => {
        if (!el.aplicaDescuento) {
          return el;
        } else if (
          el.aplicaDescuento &&
          !(
            (new Date(el.descuento.desde).getTime() / 1000).toFixed(0) <
              (new Date().getTime() / 1000).toFixed(0) &&
            (new Date().getTime() / 1000).toFixed(0) <
              (new Date(el.descuento.hasta).getTime() / 1000).toFixed(0)
          )
        ) {
          el.aplicaDescuento = false;
          el.descuento.desde = "";
          el.descuento.hasta = "";
          el.descuento.montoDescuento = "";
          el.descuento.porcentajeDescuento = "";
          el.descuento.tipoPorcentaje = true;
          el.descuento.tipoMonto = false;
          return el;
        }
      });
    },
  },
  mounted() {
    if (localStorage.getItem("likes") === null) {
      localStorage.setItem("likes", "[]");
    }
    this.setLikeProductos();
  },
};
</script>

<style>
.sombreadoProducto {
  border-width: 0px !important;
}
#contenedorInicio {
  background: #fff !important;
  padding-top: 15px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 20px;
  height: 100% !important;
}
.container {
  background: #fff !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.carroEnlace:hover,
.botonHome:hover,
a.nav-link,
a.nav-link:hover {
  color: #fff !important;
}
#navegadorArriba,
.carroEnlace {
  background-color: transparent !important;
}
.carroEnlace {
  color: #fff !important;
}
div#ModalCarroCompras___BV_modal_body_::-webkit-scrollbar,
html::-webkit-scrollbar,
div#scrollTerminosCondiciones::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #263238 !important;
}
div#ModalCarroCompras___BV_modal_body_::-webkit-scrollbar-track,
html::-webkit-scrollbar-track,
div#scrollTerminosCondiciones::-webkit-scrollbar-track {
  box-shadow: rgb(255, 255, 255);
}
div#ModalCarroCompras___BV_modal_body_::-webkit-scrollbar-thumb,
html::-webkit-scrollbar-thumb,
div#scrollTerminosCondiciones::-webkit-scrollbar-thumb {
  background-color: rgb(182, 182, 182);
  outline: 0px;
}
.noSeleccionable {
  user-select: none !important;
  -webkit-user-select: none !important;
}
</style>