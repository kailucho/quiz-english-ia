// src/models/QuestionModel.js
export default class QuestionModel {
  constructor(questionText, options, correctAnswer) {
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
}
