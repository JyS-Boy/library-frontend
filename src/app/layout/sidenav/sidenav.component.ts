import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  label: string;
  route: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {

  private readonly authService = inject(AuthService);

  get isAdmin(): boolean {
    return this.authService.currentUser()?.role === 'Admin';
  }

  get visibleNavItems(): NavItem[] {
    return this.navItems.filter(item => {
      if (item.adminOnly) {
        return this.isAdmin;
      }
      return true;
    });
  }

  readonly navItems: NavItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      label: 'Users',
      route: '/users',
      adminOnly: true
    },
    {
      label: 'Authors',
      route: '/authors'
    },
    {
      label: 'Categories',
      route: '/categories'
    },
    {
      label: 'Books',
      route: '/books'
    },
    {
      label: 'Readers',
      route: '/readers'
    },
    {
      label: 'Loans',
      route: '/loans'
    }
  ];
}