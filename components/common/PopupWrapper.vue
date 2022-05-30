<!-- eslint-disable prettier/prettier, max-len -->
<template>
  <modal
    :id="id"
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
  },
};
</script>

<style lang="scss">
  .modal-close {
    .icon-cross {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      position: absolute;
      right: 15px;
      top: 10px;
      cursor: pointer;

      &:after, &:before {
        content: "";
        position: absolute;
        height: 2px;
        background-color: #000;
        width: 14px;
      }

      &:before {
        transform: rotate(-45deg);
      }
      &:after {
        transform: rotate(45deg);
      }
    }
  }
</style>
