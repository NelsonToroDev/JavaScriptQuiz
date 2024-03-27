/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { fetchAllQuestions } from '../services/questionsService'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: ((questionId: number, answerIndex: number) => void)
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

// middleware logger
// const logger = (config) => (set, get, api) => {
//   return config(
//     (...args) => {
//       console.log('previous state:', ...args)
//       set(...args)
//       console.log('new state:', ...args)
//     },
//     get,
//     api
//   )
// }

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number): Promise<void> => {
      const allQuestions = await fetchAllQuestions()
      const questions = allQuestions.sort(() => Math.random() - 0.5).slice(0, limit)
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
    },
    reset: (): void => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
},
{
  name: 'questions'
})))
