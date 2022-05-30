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

          <div
            v-if="formData.length"
            class="popup-question-form__content-question-list"
          >
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
                <input
                  :id="item.code"
                  v-model="formData[questionIndex].value"
                  :type="item.type"
                  :name="item.code"
                  :value="item.code"
                  :disabled="validateQuestionField(item.code)"
                />
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
                <textarea
                  :id="item.code"
                  :name="item.code"
                  :disabled="validateQuestionField(item.code)"
                  @change="textFieldRecord($event, questionIndex)"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        :type="navigateButton.type"
        class="button"
        :disabled="navigateButton.disabled"
        @click="changeQuestion"
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
      formData: [],
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
          disabled: !this.validateQuestion,
        }
      }

      return {
        type: 'submit',
        text: 'Done',
        disabled: !this.validateQuestion,
      }
    },
    validateQuestion() {
      const questionValue =
        this.formData[this.currentQuestionIndex - 1]?.value.length

      if (questionValue === 0) {
        return false
      }

      if (this.currentQuestion?.type === 'single') {
        if (questionValue > 1) {
          return false
        }
      }

      return true
    },
    validateQuestionField() {
      return (code) => {
        if (
          this.formData[this.currentQuestionIndex - 1]?.value.find(
            (value) => value === code || value.code === code
          )
        ) {
          return false
        }

        return (
          this.currentQuestion.type === 'single' &&
          this.formData[this.currentQuestionIndex - 1]?.value.length >= 1
        )
      }
    },
  },
  mounted() {
    this.currentQuestion = this.questions[0]
    this.generateFormData()
  },
  methods: {
    textFieldRecord(e, questionIndex) {
      const index = this.formData[questionIndex].value.findIndex(
        (element) => element.code === e.target.name
      )

      if (index !== -1) {
        if (e.target.value.trim()) {
          this.formData[questionIndex].value[index] = e.target.value.trim()
        } else {
          this.formData[questionIndex].value.splice(index, 1)
        }
      } else {
        this.formData[questionIndex].value.push({
          code: e.target.name,
          value: e.target.value.trim(),
        })
      }
    },
    generateFormData() {
      this.formData = this.questions.map((question) => {
        return {
          id: question.id,
          code: question.code,
          value: [],
        }
      })
    },
    changeQuestion(e) {
      e.preventDefault()

      if (!this.validateQuestion) {
        return false
      }

      const questionIndex = this.currentQuestionIndex + 1
      if (questionIndex !== this.currentQuestionIndex) {
        this.currentQuestionIndex = questionIndex
      }

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
    &-list {
      &-item {
        &-field {
          &--textarea {
            textarea {
              resize: none;
            }
          }
        }
      }
    }
  }
}
</style>
