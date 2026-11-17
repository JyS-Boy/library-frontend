import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  protected readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}