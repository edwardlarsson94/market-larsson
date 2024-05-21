import { createReducer, on } from '@ngrx/store';
import { setShowLoginForm } from './app.actions';

export const initialState: boolean = true;

const _authReducer = createReducer(
  initialState,
  on(setShowLoginForm, (state, { show }) => show)
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
