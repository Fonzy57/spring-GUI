import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  if (auth.role === 'ROLE_ADMINISTRATEUR') {
    return true;
  }

  const router: Router = inject(Router);

  return router.parseUrl('/connexion');
};
