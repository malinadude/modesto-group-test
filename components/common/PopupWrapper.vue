<!-- eslint-disable prettier/prettier, max-len -->
<template>
  <modal
    :id="id"
    :width="width"
    :adaptive="true"
    :scrollable="true"
    :name="id"
    height="auto"
    class="modal"
  >
    <div class="modal-wrapper">
      <div class="modal-close">
        <span
          class="icon-cross icon-close"
          @click="$modal.hide(id)"
        ></span>
      </div>

      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </modal>
</template>
<!-- eslint-enable -->

<script>
export default {
  name: 'PopupWrapper',
  props: {
    id: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 930,
    },
  },
};
</script>
