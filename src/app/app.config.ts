import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { showLoginFormReducer, hiddenLoginFormReducer, cartReducer, userReducer } from './state/app.reducer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideStore({
      showLoginForm: showLoginFormReducer,
      hiddenLoginForm: hiddenLoginFormReducer,
      productsInCart: cartReducer,
      user: userReducer
    })
  ]
};
