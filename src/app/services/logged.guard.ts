import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const jwt = localStorage.getItem('jwt');

  if (jwt === null) {
    const router: Router = inject(Router);

    return router.parseUrl('/connexion');
  }

  return true;
};
