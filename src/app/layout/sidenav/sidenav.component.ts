import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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