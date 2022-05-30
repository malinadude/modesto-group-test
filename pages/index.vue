<template>
  <PopupQuestionForm
    :questions="questions"
  />
</template>

<script>
import QuestionsApiService from '~/services/questions/QuestionsApiService';
import {
  PopupQuestionForm,
} from '~/components/common';

export default {
  name: 'IndexPage',
  components: { PopupQuestionForm },
  data() {
    return {
      questionsApiService: new QuestionsApiService(this.$axios),
      questions: [],
    };
  },
  mounted() {
    if (!localStorage.getItem('questionFormCompleted')) {
      this.getQuestions();
      this.$modal.show('popup-question-form');
    }
  },
  methods: {
    async getQuestions() {
      this.questions = await this.questionsApiService.getQuestions();
    },
  },
}
</script>
