import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Role } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

export const roleGuard =
  (requiredRole: Role): CanActivateFn =>
  () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (
      authService.currentUser()?.role === requiredRole
    ) {
      return true;
    }

    router.navigate(['/403']);

    return false;
  };