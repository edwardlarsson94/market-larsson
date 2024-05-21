import { createAction, props } from '@ngrx/store';

export const setShowLoginForm = createAction(
  '[Auth] Set Show Login Form',
  props<{ show: boolean }>()
);