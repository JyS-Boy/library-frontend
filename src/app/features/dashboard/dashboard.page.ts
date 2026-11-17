import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  protected readonly auth = inject(AuthService);

  get isAdmin(): boolean {
    return this.auth.currentUser()?.role === 'Admin';
  }

  get userName(): string {
    return this.auth.currentUser()?.userName ?? 'Usuario';
  }
}