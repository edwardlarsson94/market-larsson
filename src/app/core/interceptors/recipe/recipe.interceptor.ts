import { HttpInterceptorFn } from '@angular/common/http';

export const recipeInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
