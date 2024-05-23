import { Product } from "../models/interface/product/product";

export interface AppState {
    showLoginForm: boolean;
    productsInCart: Product[];
}