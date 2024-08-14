import { useQuiz } from '../context/QuizContext';

export default function Options() {
  const {
    quizState: { questions, quizIndex, answerIndex },
    dispatchQuiz,
  } = useQuiz();

  const question = questions[quizIndex];
  const hasAnswered = answerIndex !== null;

  return (
    <div className='options'>
      {question.options.map((option, idx) => (
        <button
          key={option}
          className={`btn btn-option ${idx === answerIndex ? 'answer' : ''} ${
            hasAnswered
              ? idx === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasAnswered}
          onClick={() =>
            dispatchQuiz({
              type: 'answer',
              payload: question.options.indexOf(option),
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
