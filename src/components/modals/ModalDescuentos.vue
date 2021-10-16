<template>
  <div>
    <b-modal
      id="modal_2"
      style="
        border: 0px solid rgba(0, 0, 0, 0.2) !important;
        user-select: none !important;
      "
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
        :showControls="false"
        class="imgGaleria noSeleccionable"
        :iid.sync="currentId"
        :width="600"
        :height="400"
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
        <div class="w-100 footerFlex" style="margin: 0px !important">
          <b-button
            variant="outline-dark"
            size="sm"
            class="float-left"
            style="
              margin-left: 1px;
              border-radius: 5px !important;
              font-family: 'OverpassLight';
              font-weight: 800 !important;
            "
            @click="agregarAlCarro"
          >
            Agregar al Carro
            <b-icon scale="1" icon="cart-check" aria-hidden="true"></b-icon>
          </b-button>
          <b-badge
            v-if="!producto.aplicaDescuento"
            variant="dark"
            class="text-right pl-1 pr-1 pt-3 pb-0"
            style="
              flex: 1;
              color: #000 !important;
              background-color: transparent !important;
              font-family: 'OverpassLight';
              width: 170px !important;
              font-size: 18px !important;
            "
          >
            {{ producto.precioProducto | currency }}
          </b-badge>
          <div class="w-50 float-right">
            <b-badge
              v-if="producto.aplicaDescuento"
              variant="dark"
              class="text-right float-right pl-1 pt-1 pb-0"
              id="footerModal"
              style="
                padding-top: 0px;
                padding-right: 4px !important;
                display: block;
                color: #000 !important;
                background-color: transparent !important;
                font-family: 'OverpassLight';
                width: 170px !important;
                font-size: 16px !important;
                text-decoration-line: line-through;
              "
            >
              {{ producto.precioProducto | currency }}
            </b-badge>
            <b-badge
              v-if="producto.aplicaDescuento"
              variant="dark"
              class="text-right float-right pl-1 pr-1 pb-0"
              id="footerModal"
              style="
                padding-top: 0px;
                display: block;
                color: #000 !important;
                background-color: transparent !important;
                font-family: 'OverpassLight';
                width: 170px !important;
                font-size: 16px !important;
                margin-top: 2px !important;
              "
            >
              {{
                (producto.precioProducto - producto.descuento.montoDescuento)
                  | currency
              }}
            </b-badge>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import lingallery from "lingallery";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      tituloDelModal: "",
      arrayImagenes: [],
      currentId: null,
      arrayProductos: [],
      arrayNuevo: [],
      producto: "",
      prod: {
        nom: String,
        cuer: String,
        cant: String,
        id: String,
      },
    };
  },
  components: {
    lingallery,
  },
  props: {
    tituloModal: String,
    textoModal: String,
    precio: Number,
  },
  computed: {
    ...mapState(["ProductosCarro"]),
  },
  methods: {
    ...mapMutations(["modificarCarro", "modifPuraCantidad"]),
    cerrarModal() {
      this.$bvModal.hide("modal_2");
    },
    agregarAlCarro() {
      let that = this;
      let suma = true;
      this.ProductosCarro.map(function (elemento) {
        if (elemento.codigo === that.producto.idProducto) {
          suma = false;
          return;
        }
      });
      if (suma === true) {
        this.ProductosCarro.push({
          tituloProducto: this.producto.tituloProducto,
          textoProducto: this.producto.textoProducto,
          codigo: this.producto.idProducto,
          laCantidad: this.producto.laCantidad,
          precio: this.producto.precioProducto,
          imagen: `${this.arrayImagenes[0].src}`,
          color: this.colorNombre,
          descuento: this.producto.descuento,
        });
        this.modificarCarro(this.ProductosCarro);
      }
      this.$bvModal.hide("modal_2");
    },
    cerrarmodal() {
      this.$bvModal.hide("modal_2");
    },
  },
};
</script>

<style>
#modal_2___BV_modal_header_ {
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
  /* background-color: #ce3333!important; */
  background-color: #272727 !important;
  border-bottom: 4px solid #ce3333 !important;
}
#modal_2___BV_modal_content_ {
  border-width: 0px !important;
}
#modal_2___BV_modal_title_ {
  padding-top: 6px !important;
}
#modal_2___BV_modal_footer_ {
  padding-top: 4px !important;
  padding-bottom: 6px !important;
}
</style>