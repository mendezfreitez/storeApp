<template>
  <b-modal
    id="modalVaciarCarro"
    hide-header
    hide-footer
    centered
    content-class="shadow"
    title="BootstrapVue"
  >
    <p class="pt-3 pl-3" style="font-size: 19px; font-family: 'OverpassLight'">
      ¿Desea eliminar los {{ cantElementosCarro }} productos de su carro?
    </p>
    <div class="w-100 pb-2 pr-2 text-right" style="margin: 0px !important">
      <b-button variant="warning" class="vaian" @click="vaciarCarro"
        >VACIAR</b-button
      >
      <b-button class="ml-2" variant="dark" @click="hideModal"
        >CANCELAR</b-button
      >
    </div>
  </b-modal>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      cantElementosCarro: 0,
    };
  },
  methods: {
    ...mapMutations(["modificarCarro"]),
    hideModal() {
      this.$bvModal.hide("modalVaciarCarro");
    },
    vaciarCarro() {
      this.modificarCarro([]);
      this.hideModal();
      setTimeout(() => {
        this.$bvModal.hide("ModalCarroCompras");
      }, 1000);
    },
  },
};
</script>

<style>
.vaian {
  color: #000;
}
#modalVaciarCarro > div {
  width: 441px;
}
#modalVaciarCarro___BV_modal_content_ {
  border-radius: 15px !important;
}
</style>