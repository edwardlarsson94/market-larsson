import { createAction, props } from '@ngrx/store';
import { Product } from '../models/interface/product/product';
import { User } from '../models/interface/auth/user';

export const setShowLoginForm = createAction(
  '[Auth] Set Show Login Form',
  props<{ show: boolean }>()
);

export const setHiddenLoginForm = createAction(
  '[Auth] Set Hidden Login Form',
  props<{ show: boolean }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: string }>()
);

export const increaseQuantity = createAction(
  '[Cart] Increase Quantity',
  props<{ productId: string }>()
);

export const decreaseQuantity = createAction(
  '[Cart] Decrease Quantity',
  props<{ productId: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const setUser = createAction(
  '[User] Set User',
  props<{ user: User }>()
);

export const clearUser = createAction('[User] Clear User');
