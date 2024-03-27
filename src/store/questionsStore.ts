import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Question } from '../types'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: ((questionId: number, answerIndex: number) => void)
  goNextQuestion: () => void
  goPreviousQuestion: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number): Promise<void> => {
      const res = await fetch('http://localhost:5173/data.json')
      const json = await res.json()
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

      set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number): void => {
      const state = get()
      const { questions } = state

      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      // update the state
      newQuestions[questionIndex] = {
        ...questionInfo,
        userSelectedAnswer: answerIndex,
        isCorrectUserAnswer
      }

      // confetti
      if (isCorrectUserAnswer) confetti()

      set({ questions: newQuestions })
    },
    goNextQuestion: (): void => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPreviousQuestion: (): void => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1
      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    }
  }
},
{
  name: 'questions'
}))
