import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Reducer,
  Dispatch,
} from 'react';
import Question from '../models/Question';

enum QuizStatus {
  Loading = 'loading',
  Error = 'error',
  Ready = 'ready',
  Active = 'active',
  Finished = 'finished',
}

interface QuizState {
  questions: Question[];
  status: QuizStatus;
  quizIndex: number;
  answerIndex: number | null;
  score: number;
  highscore: number;
}

const initState: QuizState = {
  questions: [],
  status: QuizStatus.Loading,
  quizIndex: 0,
  answerIndex: null,
  score: 0,
  highscore: 0,
};

// interface QuizAction {
//   type: 'dataReceived' | 'dataFailed' | 'start' | 'answer';
//   payload?: Question[] | number;
// }

type QuizAction =
  | {
      type: 'dataReceived';
      payload: Question[];
    }
  | {
      type: 'answer';
      payload: number;
    }
  | {
      type: 'dataFailed' | 'start' | 'nextQuestion' | 'finish' | 'restart';
      payload?: never;
    };

const quizReducer: Reducer<QuizState, QuizAction> = (state, action) => {
  // switch (action.type) {
  //   case 'dataReceived':
  //     return {
  //       ...state,
  //       questions: action.payload,
  //       status: QuizStatus.Ready,
  //     };
  //   case 'dataFailed':
  //     return { ...state, status: QuizStatus.Error };
  //   case 'start':
  //     return { ...state, status: QuizStatus.Active };
  //   case 'answer': {
  //     const question = state.questions.at(state.quizIndex)!;
  //     console.log(question.correctOption, action.payload);
  //     return {
  //       ...state,
  //       answerIndex: action.payload,
  //       score:
  //         question.correctOption === action.payload
  //           ? state.score + (question.points ?? 0)
  //           : state.score,
  //     };
  //   }
  //   default:
  //     throw new Error(`Invalid action type: ${action['type']}`);
  // }

  const newState = {
    ['dataReceived']: {
      ...state,
      questions: (action.payload as Question[]) ?? [],
      status: QuizStatus.Ready,
    },
    ['dataFailed']: { ...state, status: QuizStatus.Error },
    ['start']: { ...state, status: QuizStatus.Active },
    ['answer']: {
      ...state,
      answerIndex: action.payload as number,
      score:
        state.questions.at(state.quizIndex)?.correctOption === action.payload
          ? state.score + (state.questions.at(state.quizIndex)?.points ?? 0)
          : state.score,
    },
    ['nextQuestion']: {
      ...state,
      quizIndex: state.quizIndex + 1,
      answerIndex: null,
    },
    ['finish']: {
      ...state,
      status: QuizStatus.Finished,
      highscore: state.score > state.highscore ? state.score : state.highscore,
    },
    ['restart']: {
      ...state,
      status: QuizStatus.Ready,
      quizIndex: 0,
      answerIndex: null,
      score: 0,
    },
  }[action.type];

  if (newState === undefined) {
    throw new Error(`Invalid action type: ${action.type}`);
  }

  return newState;
};

const QuizContext = createContext<
  | {
      quizState: QuizState;
      dispatchQuiz: Dispatch<QuizAction>;
    }
  | undefined
>(undefined);

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizState, dispatchQuiz] = useReducer(quizReducer, initState);

  return (
    <QuizContext.Provider value={{ quizState, dispatchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { QuizStatus, QuizProvider, useQuiz };
