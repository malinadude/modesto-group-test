<template>
  <PopupWrapper id="popup-question-form" class="popup-question-form">
    <form onsubmit="submit">
      <h2 class="title">Please answer a few questions</h2>

      <div class="popup-question-form__steps">
        <div
          v-for="stepIndex in questionsLength"
          :key="stepIndex"
          :class="{
            'popup-question-form__steps-item--active':
              checkCurrentQuestionStepIndex(stepIndex),
          }"
          :style="{ zIndex: generateZIndexQuestionStep(stepIndex) }"
          class="popup-question-form__steps-item"
          @click="changeQuestion($event, stepIndex)"
        ></div>
      </div>

      <div class="popup-question-form__content">
        <div
          v-for="(question, questionIndex) in questions"
          :key="question.id"
          :class="{
            'popup-question-form__content-question--active':
              checkCurrentQuestionIndex(questionIndex),
          }"
          class="popup-question-form__content-question"
        >
          <div class="popup-question-form__content-question-head">
            {{ `${question.title} (${questionIndex + 1}/${questionsLength})` }}
          </div>

          <div class="popup-question-form__content-question-list">
            <div
              v-for="item in question.items"
              :key="item.code"
              class="popup-question-form__content-question-list-item"
            >
              <div
                v-if="item.type === 'checkbox'"
                :class="`popup-question-form__content-question-list-item-field--${item.type}`"
                class="popup-question-form__content-question-list-item-field"
              >
                <input :id="item.code" :type="item.type" :name="item.code" />
                <label :for="item.code">
                  {{ item.title }}
                </label>
              </div>

              <div
                v-if="item.type === 'textarea'"
                :class="`popup-question-form__content-question-list-item-field--${item.type}`"
                class="popup-question-form__content-question-list-item-field"
              >
                <label :for="item.code">
                  {{ item.title }}
                </label>
                <textarea :id="item.code" :name="item.code"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        :type="navigateButton.type"
        class="button"
        @click="changeQuestion($event, currentQuestionIndex + 1)"
      >
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
      currentQuestion: null,
      currentQuestionIndex: 1,
      formData: null,
    }
  },
  computed: {
    questionsLength() {
      return this.questions.length
    },
    navigateButton() {
      if (!(this.currentQuestionIndex === this.questionsLength)) {
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
  watch: {
    questions(questions) {


      this.formData = questions.map((question) => {
        return {
          id: question.id,
          code: question.code,
          value: question.type === 'single' ? null : [],
        };
      })
    }
  },
  methods: {
    changeQuestion(e, questionIndex = this.currentQuestionIndex + 1) {
      e.preventDefault()

      if (questionIndex > this.currentQuestionIndex) {
        return false;
      }

      this.currentQuestionIndex = questionIndex
      this.currentQuestion = this.questions[questionIndex - 1]
    },
    checkCurrentQuestionStepIndex(stepIndex) {
      return stepIndex <= this.currentQuestionIndex
    },
    generateZIndexQuestionStep(stepIndex) {
      return this.questionsLength - stepIndex
    },
    checkCurrentQuestionIndex(questionIndex) {
      return questionIndex + 1 === this.currentQuestionIndex
    },
    submit(e) {
      e.preventDefault()
    },
  },
}
</script>

<style lang="scss">
.popup-question-form {
  &__steps {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    margin-bottom: 22px;

    &-item {
      position: relative;

      &:before {
        width: 100vw;
        display: block;
        height: 3px;
        background: #c4c4c4;
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        z-index: 1;
      }
      &:after {
        content: '';
        width: 21px;
        height: 21px;
        background: #c4c4c4;
        border: 2px solid #b3b3b3;
        display: block;
        border-radius: 100%;
        position: relative;
        z-index: 2;
        cursor: pointer;
      }
      &--active {
        &:before {
          background: #4bbbfa;
        }
        &:after {
          background: #8cd6ff;
          border: 2px solid #4bbbfa;
        }
      }
    }
  }
  &__content-question {
    display: none;

    &--active {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
