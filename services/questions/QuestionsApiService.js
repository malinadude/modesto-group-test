import BaseApiService from '~/services/BaseApiService';

export default class QuestionsApiService extends BaseApiService {
  async getQuestions() {
    try {
      return await this.axios.$get(`/questions`);
    } catch (e) {
      alert(e);
    }
  }
}
