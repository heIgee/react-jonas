import { IRootState, IAppDispatch } from './store';
import { TypedUseSelectorHook } from 'react-redux';

declare module 'react-redux' {
  export const useSelector: TypedUseSelectorHook<IRootState>;
  export const useDispatch: () => IAppDispatch;
}
