import { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Progress() {
  const {
    quizState: { questions, quizIndex, score, answerIndex },
  } = useQuiz();
  const maxScore = useMemo(
    () => questions.reduce((acc, cur) => acc + cur.points, 0),
    [questions],
  );
  return (
    <header className='progress'>
      <progress
        max={questions.length}
        value={quizIndex + Number(answerIndex !== null)}
      ></progress>
      <p>
        Question <strong>{quizIndex + 1}</strong> / {questions.length}
      </p>
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </header>
  );
}
