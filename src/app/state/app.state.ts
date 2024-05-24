import { User } from "../models/interface/auth/user";
import { Product } from "../models/interface/product/product";

export interface AppState {
    showLoginForm: boolean;
    productsInCart: Product[];
    user: User | null;
}