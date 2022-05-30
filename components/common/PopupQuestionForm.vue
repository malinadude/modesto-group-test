<template>
  <PopupWrapper id="popup-question-form">
    <form>
      <h2 class="title">Please answer a few questions</h2>

      <div class="popup-question-form__steps">

      </div>

      <div class="popup-question-form__content">
        <div class="popup-question-form__content-head">
          How often do you visit our site? (1/5)
        </div>

        <div class="popup-question-form__content-questions">

        </div>
      </div>

      <button type="button" class="button">Next</button>
    </form>
  </PopupWrapper>
</template>

<script>
import PopupWrapper from './PopupWrapper'

export default {
  name: 'PopupQuestionForm',
  components: { PopupWrapper },
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {

    };
  },
}
</script>

<style lang="scss">

</style>
