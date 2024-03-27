/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuestionsStore } from '../store/questionsStore'

export const useQuestionsData = () => {
  const questions = useQuestionsStore(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, isCorrectUserAnswer } = question
    if (userSelectedAnswer == null) unanswered++
    if (isCorrectUserAnswer === true) correct++
  })

  incorrect = questions.length - (correct + unanswered)
  return { correct, incorrect, unanswered }
}
