/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuestionsData } from '../hooks/useQuestionsData'
import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questionsStore'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()

  const reset = useQuestionsStore(state => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correct - ❌ ${incorrect} incorrect - ❓ ${unanswered} unanswered`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => { reset() }}>Reset Quiz</Button>
      </div>
    </footer>
  )
}
