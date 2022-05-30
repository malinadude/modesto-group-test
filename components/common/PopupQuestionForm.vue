<template>
  <PopupWrapper id="popup-question-form">
    <form>
      <h2 class="title">Please answer a few questions</h2>

      <div class="popup-question-form__steps">
        <div
          v-for="stepIndex in questionsLength"
          :key="stepIndex"
          class="popup-question-form__steps-item"
        ></div>
      </div>

      <div class="popup-question-form__content">
        <div
          v-for="(question, questionIndex) in questions"
          :key="question.id"
          class="popup-question-form__content-question"
        >
          <div class="popup-question-form__content-question-head">
            {{ `${question.title} (${questionIndex + 1}/${questionsLength})` }}
          </div>

          <div
            v-for="item in question.items"
            :key="item.code"
            class="popup-question-form__content-question-items"
          ></div>
        </div>
      </div>

      <button :type="navigateButton.type" class="button">
        {{ navigateButton.text }}
      </button>
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
      currentQuestionIndex: 1,
    }
  },
  computed: {
    questionsLength() {
      return this.questions.length
    },
    navigateButton() {
      if (!this.currentQuestionIndex === this.questionsLength) {
        return {
          type: 'button',
          text: 'Next',
        }
      }

      return {
        type: 'submit',
        text: 'Done',
      }
    },
  },
}
</script>

<style lang="scss"></style>
