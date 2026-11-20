import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.currentUser();
    const isAdmin = user?.role === 'Admin';

    if (!isAdmin) {
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
};