import { createReducer, on } from '@ngrx/store';
import { setShowLoginForm, setUser, clearUser, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setHiddenLoginForm } from './app.actions';
import { Product } from '../models/interface/product/product';
import { User } from '../models/interface/auth/user';
import { defaultRegister } from '../models/default/auth/auth';

export const initialState: boolean = true;
export const initialCartState: Product[] = [];
export const initialUserState: User = defaultRegister;

const _authReducer = createReducer(
  initialState,
  on(setShowLoginForm, (state, { show }) => {
    console.log('1',show);
    return show
  }),
  on(setHiddenLoginForm, (state, { show }) => {
    console.log('2',show);
    return show
  })
);

const _cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { product }) => {
    const existingProductIndex = state.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedProduct = { ...state[existingProductIndex], quantity: state[existingProductIndex].quantity + 1 };
      return [
        ...state.slice(0, existingProductIndex),
        updatedProduct,
        ...state.slice(existingProductIndex + 1)
      ];
    } else {
      return [...state, { ...product, quantity: 1 }];
    }
  }),
  on(removeFromCart, (state, { productId }) => state.filter(item => item.id !== productId)),
  on(increaseQuantity, (state, { productId }) => {
    return state.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
  }),
  on(decreaseQuantity, (state, { productId }) => {
    return state.map(item => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0);
  }),
  on(clearCart, () => initialCartState)
);

const _userReducer = createReducer(
  initialUserState,
  on(setUser, (state, { user }) => user),
  on(clearUser, () => initialUserState)
);

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}