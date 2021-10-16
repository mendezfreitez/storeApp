<template>
  <b-modal
    style="width: 150px"
    id="modal-mensajeCarro"
    header-close-variant="light"
    header-text-variant="light"
    hide-header
    cancel-variant="transparent"
    size="md"
    hide-footer
    hide-backdrop
    :title="titulo"
    v-model="showModal"
  >
    <p style=" font-size: 20px !important; color: #fff; font-family: 'OverpassLight';" class="mt-2 mb-3 text-center">
      {{ texto }}
    </p>
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
  watch: {
    showModal: function () {
      setTimeout(() => {
        this.showModal = false;
      }, 1500);
    },
  },
};
</script>

<style>
#modal-mensajeCarro > div {
  width: 340px;
  margin-top: 3px;
}
#modal-mensajeCarro___BV_modal_content_ {
  background: #7c7c7c42;
}
</style>