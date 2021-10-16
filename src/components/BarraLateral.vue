<template>
  <div>
    <b-sidebar
      id="barraLateral"
      title="MENÚ"
      :backdrop-variant="variant"
      text-variant="light"
      shadow
      backdrop
      style="
        font-family: 'OverpassLight';
        font-weight: 900 !important;
        user-select: none !important;
        width: 200px !important;
      "
    >
      <b-navbar-nav class="text-left">
        <b-nav-item
          v-b-toggle.sidebar-backdrop
          href="#"
          to="/"
          @click="traerporCategorias('', 'INICIO')"
          class="pl-2 ddd pt-1"
          style="
            font-size: 23px;
            font-family: 'OverpassLight';
            font-weight: 700 !important;
            user-select: none !important;
          "
        >
          Inicio
          <b-img
            height="30"
            right
            class="mr-4"
            :src="require('../editor/img/categorias/Inicio2.svg')"
            alt=""
          />
        </b-nav-item>

        <b-nav-item
          v-b-toggle.sidebar-backdrop
          v-for="categoria in categoriasTodas"
          :key="categoria._id"
          href="#"
          @click="traerporCategorias(categoria._id, categoria.nombre)"
          class="pl-2 pt-1 ddd"
          style="
            font-size: 23px;
            font-family: 'OverpassLight';
            font-weight: 400 !important;
            user-select: none !important;
          "
        >
          {{ categoria.nombre }}
          <!-- <b-img height="40" right class="mr-4" :src="require('../editor/img/categorias/' + categoria.nombre + '.svg')" alt=""></b-img> -->
        </b-nav-item>

        <b-nav-item
          href="#"
          to="/personalizado"
          class="pl-2 pt-1 ddd"
          style="
            font-size: 23px;
            font-family: 'OverpassLight';
            font-weight: 700 !important;
            user-select: none !important;
          "
        >
          Personalizado
          <b-img
            height="30"
            right
            class="mr-4"
            :src="require('../editor/img/categorias/Personalizar2.svg')"
            alt=""
          ></b-img>
        </b-nav-item>
      </b-navbar-nav>
    </b-sidebar>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      categoriasTodas: [],
      variant: "transparent",
      // variants: [
      //   'transparent',
      //   'black',
      //   'light',
      //   'dark',
      //   'primary',
      //   'secondary',
      //   'success',
      //   'danger',
      //   'warning',
      //   'info',
      // ]
    };
  },
  mounted() {
    axios.get(`${this.url}traerCategorias`).then(
      function (resp) {
        this.categoriasTodas = resp.data;
      }.bind(this)
    );
  },
  methods: {
    ...mapMutations([
      "traerProductosTodos",
      "setProductos",
      "setNombreCategoria",
    ]),
    traerporCategorias(idCategoria, nombreCategoria) {
      this.setNombreCategoria(nombreCategoria.toUpperCase());
      // let prods = this.productosTodos_.filter(el => el.categoria === idCategoria);
      idCategoria !== ""
        ? this.setProductos(
            this.productosTodos_.filter((el) => el.categoria === idCategoria)
          )
        : this.setProductos(this.productosTodos_);
      if (idCategoria === "") {
        document.querySelector("#textoOfertas").textContent = "OFERTAS";
      } else {
        document.querySelector(
          "#textoOfertas"
        ).textContent = `OFERTAS EN ${nombreCategoria.toUpperCase()}`;
      }
    },
  },
  computed: {
    ...mapState(["url", "nombreCategoria", "productosTodos_"]),
  },
};
</script>

<style>
.ddd:hover {
  font-size: 25px !important;
  background: #6e2424af !important;
}
.b-sidebar-header {
  background: #292727e5 !important;
  height: 66px !important;
  padding-right: 5px !important;
  padding-left: 7px !important;
}
#sidebar-backdrop {
  width: 250px !important;
}
.b-sidebar-header > button {
  padding: 10px !important;
  float: right !important;
}
.b-sidebar-body {
  background: #12273b9d !important;
}
.ddd > a {
  text-shadow: 2px 2px 3px rgb(66, 66, 66);
  height: 50px;
  display: block !important;
  align-items: center !important;
}
.ddd {
  transition: all 0.2s ease 0s;
  -webkit-transition: all 0.2s ease 0s;
}
#barraLateral {
  width: 270px !important;
  /* background: transparent!important;
  background:linear-gradient() */

  /* background-color: #b8b8b8;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%239e9e9e' points='800 100 0 200 0 800 1600 800 1600 200'/%3E%3Cpolygon fill='%23838383' points='800 200 0 400 0 800 1600 800 1600 400'/%3E%3Cpolygon fill='%23696969' points='800 300 0 600 0 800 1600 800 1600 600'/%3E%3Cpolygon fill='%234f4f4f' points='1600 800 800 400 0 800'/%3E%3Cpolygon fill='%23353535' points='1280 800 800 500 320 800'/%3E%3Cpolygon fill='%231a1a1a' points='533.3 800 1066.7 800 800 600'/%3E%3Cpolygon fill='%23000000' points='684.1 800 914.3 800 800 700'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover; */

  /* background-color: #000000;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%5' height='100%1' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%23220000' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='%23440000' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%23660000' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%23880000' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23A00' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover; */

  background-color: #474d53;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2000' height='2000' viewBox='0 0 800 800'%3E%3Cg fill='none' %3E%3Cg stroke='%2319161c' stroke-width='17'%3E%3Cline x1='-8' y1='-8' x2='808' y2='808'/%3E%3Cline x1='-8' y1='792' x2='808' y2='1608'/%3E%3Cline x1='-8' y1='-808' x2='808' y2='8'/%3E%3C/g%3E%3Cg stroke='%2318171d' stroke-width='16'%3E%3Cline x1='-8' y1='767' x2='808' y2='1583'/%3E%3Cline x1='-8' y1='17' x2='808' y2='833'/%3E%3Cline x1='-8' y1='-33' x2='808' y2='783'/%3E%3Cline x1='-8' y1='-783' x2='808' y2='33'/%3E%3C/g%3E%3Cg stroke='%2318171d' stroke-width='15'%3E%3Cline x1='-8' y1='742' x2='808' y2='1558'/%3E%3Cline x1='-8' y1='42' x2='808' y2='858'/%3E%3Cline x1='-8' y1='-58' x2='808' y2='758'/%3E%3Cline x1='-8' y1='-758' x2='808' y2='58'/%3E%3C/g%3E%3Cg stroke='%2317181e' stroke-width='14'%3E%3Cline x1='-8' y1='67' x2='808' y2='883'/%3E%3Cline x1='-8' y1='717' x2='808' y2='1533'/%3E%3Cline x1='-8' y1='-733' x2='808' y2='83'/%3E%3Cline x1='-8' y1='-83' x2='808' y2='733'/%3E%3C/g%3E%3Cg stroke='%2317191e' stroke-width='13'%3E%3Cline x1='-8' y1='92' x2='808' y2='908'/%3E%3Cline x1='-8' y1='692' x2='808' y2='1508'/%3E%3Cline x1='-8' y1='-108' x2='808' y2='708'/%3E%3Cline x1='-8' y1='-708' x2='808' y2='108'/%3E%3C/g%3E%3Cg stroke='%2317191f' stroke-width='12'%3E%3Cline x1='-8' y1='667' x2='808' y2='1483'/%3E%3Cline x1='-8' y1='117' x2='808' y2='933'/%3E%3Cline x1='-8' y1='-133' x2='808' y2='683'/%3E%3Cline x1='-8' y1='-683' x2='808' y2='133'/%3E%3C/g%3E%3Cg stroke='%23161a1f' stroke-width='11'%3E%3Cline x1='-8' y1='642' x2='808' y2='1458'/%3E%3Cline x1='-8' y1='142' x2='808' y2='958'/%3E%3Cline x1='-8' y1='-158' x2='808' y2='658'/%3E%3Cline x1='-8' y1='-658' x2='808' y2='158'/%3E%3C/g%3E%3Cg stroke='%23161a1f' stroke-width='10'%3E%3Cline x1='-8' y1='167' x2='808' y2='983'/%3E%3Cline x1='-8' y1='617' x2='808' y2='1433'/%3E%3Cline x1='-8' y1='-633' x2='808' y2='183'/%3E%3Cline x1='-8' y1='-183' x2='808' y2='633'/%3E%3C/g%3E%3Cg stroke='%23161b20' stroke-width='9'%3E%3Cline x1='-8' y1='592' x2='808' y2='1408'/%3E%3Cline x1='-8' y1='192' x2='808' y2='1008'/%3E%3Cline x1='-8' y1='-608' x2='808' y2='208'/%3E%3Cline x1='-8' y1='-208' x2='808' y2='608'/%3E%3C/g%3E%3Cg stroke='%23161c20' stroke-width='8'%3E%3Cline x1='-8' y1='567' x2='808' y2='1383'/%3E%3Cline x1='-8' y1='217' x2='808' y2='1033'/%3E%3Cline x1='-8' y1='-233' x2='808' y2='583'/%3E%3Cline x1='-8' y1='-583' x2='808' y2='233'/%3E%3C/g%3E%3Cg stroke='%23161c20' stroke-width='7'%3E%3Cline x1='-8' y1='242' x2='808' y2='1058'/%3E%3Cline x1='-8' y1='542' x2='808' y2='1358'/%3E%3Cline x1='-8' y1='-558' x2='808' y2='258'/%3E%3Cline x1='-8' y1='-258' x2='808' y2='558'/%3E%3C/g%3E%3Cg stroke='%23161d20' stroke-width='6'%3E%3Cline x1='-8' y1='267' x2='808' y2='1083'/%3E%3Cline x1='-8' y1='517' x2='808' y2='1333'/%3E%3Cline x1='-8' y1='-533' x2='808' y2='283'/%3E%3Cline x1='-8' y1='-283' x2='808' y2='533'/%3E%3C/g%3E%3Cg stroke='%23161d20' stroke-width='5'%3E%3Cline x1='-8' y1='292' x2='808' y2='1108'/%3E%3Cline x1='-8' y1='492' x2='808' y2='1308'/%3E%3Cline x1='-8' y1='-308' x2='808' y2='508'/%3E%3Cline x1='-8' y1='-508' x2='808' y2='308'/%3E%3C/g%3E%3Cg stroke='%23161e1f' stroke-width='4'%3E%3Cline x1='-8' y1='467' x2='808' y2='1283'/%3E%3Cline x1='-8' y1='317' x2='808' y2='1133'/%3E%3Cline x1='-8' y1='-333' x2='808' y2='483'/%3E%3Cline x1='-8' y1='-483' x2='808' y2='333'/%3E%3C/g%3E%3Cg stroke='%23171e1f' stroke-width='3'%3E%3Cline x1='-8' y1='342' x2='808' y2='1158'/%3E%3Cline x1='-8' y1='442' x2='808' y2='1258'/%3E%3Cline x1='-8' y1='-458' x2='808' y2='358'/%3E%3Cline x1='-8' y1='-358' x2='808' y2='458'/%3E%3C/g%3E%3Cg stroke='%23171f1f' stroke-width='2'%3E%3Cline x1='-8' y1='367' x2='808' y2='1183'/%3E%3Cline x1='-8' y1='417' x2='808' y2='1233'/%3E%3Cline x1='-8' y1='-433' x2='808' y2='383'/%3E%3Cline x1='-8' y1='-383' x2='808' y2='433'/%3E%3C/g%3E%3Cg stroke='%23181f1f' stroke-width='1'%3E%3Cline x1='-8' y1='392' x2='808' y2='1208'/%3E%3Cline x1='-8' y1='-408' x2='808' y2='408'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>