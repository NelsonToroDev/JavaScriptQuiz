/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuestionsData } from '../hooks/useQuestionsData'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correct - ❌ ${incorrect} incorrect - ❓ ${unanswered} unanswered`}</strong>
    </footer>
  )
}
