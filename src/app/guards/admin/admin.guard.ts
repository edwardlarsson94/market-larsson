import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select('user').pipe(
    map(user => {
      if (user && user.role === 'admin' && user.id) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
