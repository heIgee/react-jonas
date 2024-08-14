import { useQuiz } from '../context/QuizContext';

export default function NextButton() {
  const {
    quizState: { questions, quizIndex, answerIndex },
    dispatchQuiz,
  } = useQuiz();
  if (answerIndex === null) return null;
  const isFinishing = quizIndex >= questions.length - 1;
  return (
    <button
      className='btn btn-ui'
      onClick={() =>
        dispatchQuiz({ type: isFinishing ? 'finish' : 'nextQuestion' })
      }
    >
      {isFinishing ? 'Finish' : 'Next'}
    </button>
  );
}
