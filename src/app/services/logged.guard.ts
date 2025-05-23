import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);

  if (auth.connecte) {
    return true;
  }

  const router: Router = inject(Router);

  return router.parseUrl('/connexion');
};
