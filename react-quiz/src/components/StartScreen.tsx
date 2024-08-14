import { useQuiz } from '../context/QuizContext';

export default function StartScreen() {
  const {
    quizState: { questions },
    dispatchQuiz,
  } = useQuiz();
  return (
    <div className='start'>
      <h3>Welcome to our quiz</h3>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatchQuiz({ type: 'start' })}
      >
        let's start
      </button>
    </div>
  );
}
