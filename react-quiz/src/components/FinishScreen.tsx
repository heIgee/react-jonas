import { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function FinishScreen() {
  const {
    quizState: { questions, score, highscore },
    dispatchQuiz,
  } = useQuiz();

  const maxScore = useMemo(
    () => questions.reduce((acc, cur) => acc + cur.points, 0),
    [questions],
  );

  const percentage = useMemo(
    () => Math.ceil((score / maxScore) * 100),
    [score, maxScore],
  );

  const emoji =
    percentage >= 100
      ? '🥇'
      : percentage > 80
      ? '🎉'
      : percentage > 50
      ? '🙃'
      : '🥲';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You scored <strong>{score}</strong> out of{' '}
        {maxScore} ({percentage}
        %)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatchQuiz({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  );
}
