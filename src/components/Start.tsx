/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questionsStore'

const LIMIT_QUESTIONS = 10

export const Start = () => {
  const fetchedQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchedQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button onClick={handleClick} variant='contained'>
      Start!
    </Button>
  )
}
