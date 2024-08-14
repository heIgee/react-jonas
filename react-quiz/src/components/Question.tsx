import Options from './Options';
import { useQuiz } from '../context/QuizContext';

export default function Question() {
  const {
    quizState: { questions, quizIndex },
  } = useQuiz();
  const question = questions.at(quizIndex);
  if (question === undefined) return null;
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}
