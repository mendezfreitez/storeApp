<template>
  <b-modal
    centered
    id="modal-mensaje"
    header-close-variant="light"
    header-text-variant="light"
    cancel-variant="transparent"
    size="md"
    hide-footer
    :title="titulo"
    v-model="showModal"
  >
    <p style="font-size: 20px !important" class="mt-2 mb-3 text-center">
      {{ texto }}
    </p>
    <b-button @click="showModal = false">CERRAR</b-button>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      titulo: "",
      texto: "",
    };
  },
};
</script>

<style>
#modal-mensaje___BV_modal_title_ {
  padding-top: 5px !important;
}
</style>