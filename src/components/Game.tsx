/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Card, IconButton, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { type Question } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const QuestionInfo = ({ info }: { info: Question }) => {
  return (
    <Card variant='outlined' sx={{ bgcolor:'#222', p:2, textAlign: 'left'}}>
      <Typography variant='h5'>
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <QuestionInfo info={questionInfo} />
    </>
  )
}
