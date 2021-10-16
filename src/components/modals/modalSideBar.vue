<template>
    <b-modal
        id="ModalCategorias"
        hide-header
        style="width:20px;"
        hide-footer>
        <div
            class="listElement"
            v-for="(t, index) in listaEquipos"
            :key="index"
        >
            <div
                style="margin-top:10px;
                background:transparent;
                height:70px!important;
                border-radius:8px;
                font-size:26px!important;
                display:flex;
                flex-direction:column;
                justify-content: center;
                text-align:center;
                font-family: OverpassLight;
                color:#FFF;"
            >
                {{ t.nombre }}
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    data() {
        return{
            listaEquipos: [
                { nombre:'Liga Española', img:'espania' },
                { nombre:'Liga Francesa', img:'francia' },
                { nombre:'Liga Inglesa', img:'inglaterra' },
                { nombre:'Liga Italiana', img:'italia'},
                { nombre:'Liga Francesa', img:'francia' },
            ]
        }
    }
}
</script>

<style>
#ModalCategorias___BV_modal_content_ {
    background: transparent!important;
}
.listElement{
    background: rgba(0, 0, 0, 0.644)!important;
    /* border-radius: 8px!important; */
}
.listElement:hover {
    transform: scale(1.08);
    cursor: pointer;
    border: 0px solid #FFF!important;
}
.modal-content {
    border-width: 0px!important;
}
#ModalCategorias > div {
    height:100%!important;
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px auto;
}
#ModalCategorias {
     padding-left:0px!important;
}
</style>