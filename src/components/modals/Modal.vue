<template>
  <div>
    <b-modal
      id="modal_1"
      style="border: 0px solid rgba(0, 0, 0, 0.2) !important; user-select: none !important;"
      header-close-variant="light"
      header-text-variant="light"
      cancel-variant="transparent"
      ok-variant="outline-primary"
      ok-title="Agregar al Carro"
      cancel-title="Cerrar"
      @ok="agregarAlCarro"
      centered
    >
      <lingallery
        accentColor="#ce3333"
        class="imgGaleria noSeleccionable"
        :addons="{ enableLargeView: false }"
        :showControls="false"
        :iid.sync="currentId"
        :items="arrayImagenes"
      />

      <template v-slot:modal-header>
        <div style="display: flex; flex-direction: column">
          <p style="font-size: 17px; margin-bottom: 0px !important">
            {{ producto.tituloProducto }}
          </p>
          <p style="font-size: 13px; margin-bottom: 0px !important">
            {{ producto.textoProducto }}
          </p>
        </div>

        <span>
          <b-icon
            @click="cerrarModal"
            scale="1.9"
            style="position: absolute; top: 8px; right: 8px"
            id="btnCerrarModal_"
            icon="x"
            aria-hidden="true"
          ></b-icon>
        </span>
      </template>

      <template v-slot:modal-footer>
        <div class="w-100 pt-1 footerFlex">
          <div v-if="producto.color !== null" class="ml-1">
            <b-link
              @click="clickColor(color)"
              v-for="color in producto.color"
              :key="color._id"
              :style="{ backgroundColor: color.codigo }"
              class="colorCirculo mr-1"
            ></b-link>
          </div>

          <b-button variant="outline-dark" size="sm" style="margin-left: 1px; border-radius: 5px !important; font-family: 'OverpassLight';" @click="agregarAlCarro">
            Agregar al Carro
            <b-icon scale="1" icon="cart-check" aria-hidden="true"></b-icon>
          </b-button>
          <b-badge
            v-if="!producto.aplicaDescuento" variant="dark" class="text-right pl-1 pr-1 pt-2 pb-0" id="footerModal"
            style="
              flex: 1;
              color: #000 !important;
              background-color: transparent !important;
              font-family: 'OverpassLight';
              font-size: 18px !important;
            "
          >
            {{ producto.precioProducto | currency }}
          </b-badge>
          <div>
            <b-badge v-if="producto.aplicaDescuento" variant="dark" class="text-right pl-1 pt-1 pb-0" id="footerModal"
              style="
                padding-right: 4px !important;
                display: block;
                color: #000 !important;
                background-color: transparent !important;
                font-family: 'OverpassLight';
                width: 170px !important;
                font-size: 18px !important;
                text-decoration-line: line-through;
                user-select: none !important;
              "
            >
              {{ producto.precioProducto | currency }}
            </b-badge>
            <b-badge v-if="producto.aplicaDescuento" variant="dark" class="text-right float-right pl-1 pr-1 pt-1 pb-0" id="footerModal"
              style="
                display: block;
                color: #000 !important;
                background-color: transparent !important;
                font-family: 'OverpassLight';
                width: 170px !important;
                font-size: 18px !important;
                margin-top: 2px !important;
                user-select: none !important;
              "
            >
              {{ (producto.precioProducto - producto.descuento.montoDescuento) | currency }}
            </b-badge>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      arrayImagenes: [],
      currentId: null,
      producto: {},
      colorNombre: [],
    };
  },
  computed: {
    ...mapState(["ProductosCarro", "urlProductos", "colores"]),
  },
  methods: {
    ...mapMutations(["modificarCarro", "modifPuraCantidad"]),
    cerrarModal() {
      this.$bvModal.hide("modal_1");
    },
    clickColor(color) {
      if (this.colorNombre === color.nombre) {
        return;
      }
      var directorio = firebase
        .storage()
        .ref()
        .child(`/productos/${this.producto.idProducto}/${color.nombre}`);
      this.colorNombre = color.nombre;
      directorio.listAll().then(
        async function (result) {
          var arreglo = [];
          if (result.items.length > 0) {
            result.items.forEach(
              async function (file, index) {
                await file.getDownloadURL().then((link) => {
                  arreglo.push({ id: index, src: link, thumbnail: link });
                });
              }.bind(this)
            );123456789
            this.arrayImagenes = arreglo;
          }
        }.bind(this)
      );
    },
    agregarAlCarro() {
      let suma = true;
      this.ProductosCarro.forEach(
        function (elemento) {
          if (elemento.color !== undefined && elemento.color.length > 0) {
            if (
              elemento.codigo === this.producto.idProducto &&
              elemento.color === this.colorNombre
            ) {
              suma = false;
              return;
            }
          } else {
            if (elemento.codigo === this.producto.idProducto) {
              suma = false;
              return;
            }
          }
        }.bind(this)
      );
      if (suma) {
        this.ProductosCarro.push({
          tituloProducto: this.producto.tituloProducto,
          textoProducto: this.producto.textoProducto,
          codigo: `${this.producto.idProducto}`,
          laCantidad: this.producto.laCantidad,
          precio: this.producto.precioProducto,
          imagen: `${this.arrayImagenes[0].src}`,
          color: this.colorNombre,
        });
        this.modificarCarro(this.ProductosCarro);
      }
      this.$bvModal.hide("modal_1");
    },
  },
};
</script>

<style>
.footerFlex {
  margin: 0px !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#modal_1___BV_modal_header_ {
  justify-content: space-between;
  border-bottom: 1px solid #ce3333 !important;
  padding: 5px 0px 10px 15px !important;
}
.modal-body {
  padding: 0px !important;
}
.close {
  opacity: 1 !important;
  font-weight: 900 !important;
  font-size: 40px !important;
  padding-top: 9px !important;
  background-color: transparent !important;
}
.modal-header {
  border-bottom: 0px !important;
  background-color: #272727 !important;
}
#modal_1___BV_modal_content_ {
  border-width: 0px !important;
}
#modal_1___BV_modal_title_ {
  padding-top: 6px !important;
  user-select: none !important;
}
.colorCirculo {
  height: 22px !important;
  width: 22px !important;
  display: inline-block !important;
  border: 1px solid #494848;
}
#modal_1___BV_modal_footer_ {
  padding-top: 4px !important;
}
figure > img {
  vertical-align: middle !important;
}
div.lingallery_thumbnails_content {
  height: 64px !important;
}

.imgGaleria > div > figure {
  height: 100% !important;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: row !important;
}
.imgGaleria > div > figure > img {
  align-content: center !important;
}
#modal_1 {
  padding: 0 !important;
}
#btnCerrarModal_:hover {
  transform: scale(1.2);
  transition: 0.1s;
}

@media (min-height: 901px) {
  .imgGaleria > div > figure {
    height: 660px !important;
  }
}
@media (min-height: 801px) and (max-height: 900px) {
  .imgGaleria > div > figure {
    height: 550px !important;
  }
}
@media (min-height: 640px) and (max-height: 800px) {
  .imgGaleria > div > figure {
    height: 400px !important;
  }
}
@media (min-height: 400px) and (max-height: 639px) {
  .imgGaleria > div > figure {
    height: 300px !important;
  }
}
@media (max-height: 399px) {
  .imgGaleria > div > figure {
    height: 70% !important;
  }
}
</style>