import { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import { QuizProvider, useQuiz, QuizStatus } from '../context/QuizContext';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

function AppContent() {
  const {
    quizState: { status },
    dispatchQuiz,
  } = useQuiz();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatchQuiz({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatchQuiz({ type: 'dataFailed' });
      }
    })();
  }, [dispatchQuiz]);

  const content = {
    [QuizStatus.Loading]: <Loader />,
    [QuizStatus.Error]: <Error />,
    [QuizStatus.Ready]: <StartScreen />,
    [QuizStatus.Active]: (
      <>
        <Progress />
        <Question />
        <Footer>
          <Timer />
          <NextButton />
        </Footer>
      </>
    ),
    [QuizStatus.Finished]: <FinishScreen />,
  }[status];

  return (
    <div className='app'>
      <Header />
      <Main>{content}</Main>
    </div>
  );
}

export default function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}

