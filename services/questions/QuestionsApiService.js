import BaseApiService from '~/services/BaseApiService';

export default class QuestionsApiService extends BaseApiService {
  async getQuestions() {
    try {
      return await this.axios.$get(`/questions`);
    } catch (error) {
      alert(error);
    }
  }

  async sendQuestions(questions) {
    try {
      return await this.axios.post(
        `/questions/send`,
        {
          questions: JSON.stringify(questions)
        },
      );
    } catch (error) {
      alert(error);
    }
  }
}
