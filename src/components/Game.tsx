/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { useQuestionsStore } from '../store/questionsStore'
import { type Question } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Footer } from './Footer'

// Function that will be create once that's why we keep it outside of the component
const getBackgroundColor = (questionInfo: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = questionInfo

  // no answer selected yet
  if (userSelectedAnswer == null) return 'transparent'

  // User has selected an answer and this index is neither userSelectected or correctAnswer
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

  // If it is the correct answer
  if (index === correctAnswer) return 'green'

  // If the selected answer is not right
  if (index === userSelectedAnswer) return 'red'

  // anything else
  return 'transparent'
}

export const QuestionCard = ({ questionInfo }: { questionInfo: Question }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  // This function return another function which will be the handle click
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(questionInfo.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
      <Typography variant='h5'>
        {questionInfo.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {questionInfo.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {
          questionInfo.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={questionInfo.userSelectedAnswer != null}
                onClick={createHandleClick(index)}
                sx={{ backgroundColor: getBackgroundColor(questionInfo, index) }}
              >
                <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>

      </Stack>
      <QuestionCard questionInfo={questionInfo} />
      <Footer />
    </>
  )
}
