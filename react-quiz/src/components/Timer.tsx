import { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';

const SECONDS_PER_QUESTION = 5;

export default function Timer() {
  const {
    quizState: { questions },
    dispatchQuiz,
  } = useQuiz();
  const [secondsLeft, setSecondsLeft] = useState(
    questions.length * SECONDS_PER_QUESTION,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((sl) => sl - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) dispatchQuiz({ type: 'finish' });
  }, [secondsLeft, dispatchQuiz]);

  const minutes = (secondsLeft / 60) | 0;
  const seconds = secondsLeft % 60;
  const timeString = ` 
    ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
  `;

  return <div className='timer'>{timeString}</div>;
}
