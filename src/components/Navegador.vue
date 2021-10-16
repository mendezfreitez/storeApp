<template>
  <div id="contenedorDeNavegador">
    <b-navbar
      id="navegadorArriba"
      style="border-bottom: 4px solid #ce3333 !important"
    >
      <b-button
        v-b-toggle.barraLateral
        size="md"
        variant="transparent"
        class="ml-1 my-sm-0 botonToggler"
        style="
          border: solid 0px#fff !important;
          background-color: #e72a2ab3 !important;
          border-radius: 4px !important;
        "
      >
        <b-icon
          style="color: #272727 !important"
          class="pt-1"
          scale="1.8"
          icon="list"
        ></b-icon>
      </b-button>

      <b-link
        @click="traerProductosTodos('')"
        style="
          color: #fff !important;
          -moz-user-select: none !important;
          -khtml-user-select: none !important;
          -webkit-user-select: none !important;
        "
        to="/"
      >
        <b-img
          height="38"
          right
          class="mr-4 ml-4"
          :src="require('../editor/img/categorias/Inicio2.svg')"
          alt=""
        ></b-img>
      </b-link>

      <b-collapse id="nav-collapse mr-2" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown hidden>
            <template v-slot:button-content>
              <em>User</em>
            </template>

            <b-dropdown-item href="#"> Profile </b-dropdown-item>

            <b-dropdown-item href="#"> Sign Out </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

      <div style="margin-top: 5px !important">
        <b-link
          :hidden="!esVisible"
          size="sm"
          class="mr-4 my-sm-0 registroIngreso"
          variant="outline-light"
          @click="modalIngresar"
          style="
            font-family: 'OverpassLight';
            font-size: 16px !important;
            user-select: none !important;
          "
        >
          Ingresar
        </b-link>

        <div :hidden="esVisible">
          <b-dropdown
            id="dropdown-right"
            right
            :text="sesionUsuario"
            variant="dark"
            class="m-0 mr-3"
          >
            <b-dropdown-item
              class="non-selectable text-right"
              id="sessionItem"
              style="
                background-color: #1d2124;
                font-family: OverpassLight !important;
              "
              variant="dark"
              href="#"
              @click="dropUsuario"
            >
              Cerrar Sessión
              <b-img
                style="position: relative; margin-bottom: 3px !important"
                class="pl-1 mr-2"
                height="18"
                :src="require('../assets/off.png')"
                alt=""
              ></b-img>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <div
        style="
          width: 46px;
          height: 46px;
          cursor: pointer !important;
          -moz-user-select: none !important;
          -khtml-user-select: none !important;
          -webkit-user-select: none !important;
        "
        @click="modalCarro"
      >
        <b-badge
          class="carroEnlace"
          href="#"
          style="
            cursor: pointer !important;
            width: 30px;
            text-align: center;
            display: inline-block !important;
            color: #fff !important;
            position: relative;
            top: 15px;
            left: 0px;
            font-size: 20px !important;
            font-family: 'OverpassLight';
          "
        >
          {{ cantidadCarro }}
        </b-badge>

        <b-img
          style="position: relative; top: -30px"
          height="42"
          :src="require('../editor/img/categorias/BolsaCompra2.svg')"
          alt=""
        ></b-img>
      </div>
    </b-navbar>

    <ModalCarro ref="unModalDeCarro" />
    <ModalIngresar />
    <!-- <ModalMensaje ref="modalMensaje" /> -->
    <!-- <SideBar /> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ModalCarro from "./modals/ModalCarroCompras";
import ModalMensaje from "./modals/modalMensajeCarro";
// import SideBar from '../components/BarraLateral.vue'
import ModalIngresar from "./modals/ModalIngresar";
export default {
  name: "Navegador",
  components: {
    ModalCarro,
    ModalIngresar,
    ModalMensaje,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "cantidadCarro",
      "esVisible",
      "sesionUsuario",
      "ProductosCarro",
    ]),
  },
  methods: {
    ...mapMutations(["traerProductosTodos", "dropUsuario"]),
    modalSideBar() {
      this.$bvModal.show("sidebar-backdrop");
    },
    modalProductos() {
      if (this.ProductosCarro.length > 0) {
        this.$bvModal.show("ModalCarroCompras");
      }
    },
    modalIngresar() {
      this.$bvModal.show("modal_ingreso");
    },
    modalCarro() {
      if (this.ProductosCarro.length > 0) {
        this.$bvModal.show("ModalCarroCompras");
      }
      // else {
      //   this.$refs.modalMensaje.titulo = "Carro Vacío";
      //   this.$refs.modalMensaje.texto = "Antes ingrese productos al carro";
      //   this.$refs.modalMensaje.showModal = true;
      // }
    },
  },
};
</script>

<style>
.registroIngreso {
  height: 30px !important;
  color: #fff !important;
}
.navbar-toggler-icon {
  color: #000 !important;
}
#contenedorDeNavegador {
  text-align: center !important;
  background-color: #474d53;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2000' height='2000' viewBox='0 0 800 800'%3E%3Cg fill='none' %3E%3Cg stroke='%2319161c' stroke-width='17'%3E%3Cline x1='-8' y1='-8' x2='808' y2='808'/%3E%3Cline x1='-8' y1='792' x2='808' y2='1608'/%3E%3Cline x1='-8' y1='-808' x2='808' y2='8'/%3E%3C/g%3E%3Cg stroke='%2318171d' stroke-width='16'%3E%3Cline x1='-8' y1='767' x2='808' y2='1583'/%3E%3Cline x1='-8' y1='17' x2='808' y2='833'/%3E%3Cline x1='-8' y1='-33' x2='808' y2='783'/%3E%3Cline x1='-8' y1='-783' x2='808' y2='33'/%3E%3C/g%3E%3Cg stroke='%2318171d' stroke-width='15'%3E%3Cline x1='-8' y1='742' x2='808' y2='1558'/%3E%3Cline x1='-8' y1='42' x2='808' y2='858'/%3E%3Cline x1='-8' y1='-58' x2='808' y2='758'/%3E%3Cline x1='-8' y1='-758' x2='808' y2='58'/%3E%3C/g%3E%3Cg stroke='%2317181e' stroke-width='14'%3E%3Cline x1='-8' y1='67' x2='808' y2='883'/%3E%3Cline x1='-8' y1='717' x2='808' y2='1533'/%3E%3Cline x1='-8' y1='-733' x2='808' y2='83'/%3E%3Cline x1='-8' y1='-83' x2='808' y2='733'/%3E%3C/g%3E%3Cg stroke='%2317191e' stroke-width='13'%3E%3Cline x1='-8' y1='92' x2='808' y2='908'/%3E%3Cline x1='-8' y1='692' x2='808' y2='1508'/%3E%3Cline x1='-8' y1='-108' x2='808' y2='708'/%3E%3Cline x1='-8' y1='-708' x2='808' y2='108'/%3E%3C/g%3E%3Cg stroke='%2317191f' stroke-width='12'%3E%3Cline x1='-8' y1='667' x2='808' y2='1483'/%3E%3Cline x1='-8' y1='117' x2='808' y2='933'/%3E%3Cline x1='-8' y1='-133' x2='808' y2='683'/%3E%3Cline x1='-8' y1='-683' x2='808' y2='133'/%3E%3C/g%3E%3Cg stroke='%23161a1f' stroke-width='11'%3E%3Cline x1='-8' y1='642' x2='808' y2='1458'/%3E%3Cline x1='-8' y1='142' x2='808' y2='958'/%3E%3Cline x1='-8' y1='-158' x2='808' y2='658'/%3E%3Cline x1='-8' y1='-658' x2='808' y2='158'/%3E%3C/g%3E%3Cg stroke='%23161a1f' stroke-width='10'%3E%3Cline x1='-8' y1='167' x2='808' y2='983'/%3E%3Cline x1='-8' y1='617' x2='808' y2='1433'/%3E%3Cline x1='-8' y1='-633' x2='808' y2='183'/%3E%3Cline x1='-8' y1='-183' x2='808' y2='633'/%3E%3C/g%3E%3Cg stroke='%23161b20' stroke-width='9'%3E%3Cline x1='-8' y1='592' x2='808' y2='1408'/%3E%3Cline x1='-8' y1='192' x2='808' y2='1008'/%3E%3Cline x1='-8' y1='-608' x2='808' y2='208'/%3E%3Cline x1='-8' y1='-208' x2='808' y2='608'/%3E%3C/g%3E%3Cg stroke='%23161c20' stroke-width='8'%3E%3Cline x1='-8' y1='567' x2='808' y2='1383'/%3E%3Cline x1='-8' y1='217' x2='808' y2='1033'/%3E%3Cline x1='-8' y1='-233' x2='808' y2='583'/%3E%3Cline x1='-8' y1='-583' x2='808' y2='233'/%3E%3C/g%3E%3Cg stroke='%23161c20' stroke-width='7'%3E%3Cline x1='-8' y1='242' x2='808' y2='1058'/%3E%3Cline x1='-8' y1='542' x2='808' y2='1358'/%3E%3Cline x1='-8' y1='-558' x2='808' y2='258'/%3E%3Cline x1='-8' y1='-258' x2='808' y2='558'/%3E%3C/g%3E%3Cg stroke='%23161d20' stroke-width='6'%3E%3Cline x1='-8' y1='267' x2='808' y2='1083'/%3E%3Cline x1='-8' y1='517' x2='808' y2='1333'/%3E%3Cline x1='-8' y1='-533' x2='808' y2='283'/%3E%3Cline x1='-8' y1='-283' x2='808' y2='533'/%3E%3C/g%3E%3Cg stroke='%23161d20' stroke-width='5'%3E%3Cline x1='-8' y1='292' x2='808' y2='1108'/%3E%3Cline x1='-8' y1='492' x2='808' y2='1308'/%3E%3Cline x1='-8' y1='-308' x2='808' y2='508'/%3E%3Cline x1='-8' y1='-508' x2='808' y2='308'/%3E%3C/g%3E%3Cg stroke='%23161e1f' stroke-width='4'%3E%3Cline x1='-8' y1='467' x2='808' y2='1283'/%3E%3Cline x1='-8' y1='317' x2='808' y2='1133'/%3E%3Cline x1='-8' y1='-333' x2='808' y2='483'/%3E%3Cline x1='-8' y1='-483' x2='808' y2='333'/%3E%3C/g%3E%3Cg stroke='%23171e1f' stroke-width='3'%3E%3Cline x1='-8' y1='342' x2='808' y2='1158'/%3E%3Cline x1='-8' y1='442' x2='808' y2='1258'/%3E%3Cline x1='-8' y1='-458' x2='808' y2='358'/%3E%3Cline x1='-8' y1='-358' x2='808' y2='458'/%3E%3C/g%3E%3Cg stroke='%23171f1f' stroke-width='2'%3E%3Cline x1='-8' y1='367' x2='808' y2='1183'/%3E%3Cline x1='-8' y1='417' x2='808' y2='1233'/%3E%3Cline x1='-8' y1='-433' x2='808' y2='383'/%3E%3Cline x1='-8' y1='-383' x2='808' y2='433'/%3E%3C/g%3E%3Cg stroke='%23181f1f' stroke-width='1'%3E%3Cline x1='-8' y1='392' x2='808' y2='1208'/%3E%3Cline x1='-8' y1='-408' x2='808' y2='408'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
#sessionItem {
  color: #fff !important;
  font-size: 13px !important;
  padding-top: 7px !important;
}
#sessionItem:hover {
  background-color: #2c3e50;
  font-size: 13px !important;
}
#dropdown-right__BV_toggle_ {
  font-family: "OverpassLight" !important;
  color: #fff;
  padding-bottom: 0px !important;
  padding-top: 1px !important;
}
.carroEnlace {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
#navegadorArriba,
.carroEnlace {
  background-color: transparent !important;
}
#sessionItem {
  border-radius: 4px !important;
}
#dropdown-right > ul > li {
  border-radius: 4px !important;
}
#dropdown-right > ul {
  background: transparent !important;
}
</style>