import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { CategoryService } from '../../../core/services/category.service';

import {
  ListCategoryItem
} from '../../../core/models/category.model';

@Component({
  selector: 'app-category-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss']
})
export class CategoryListPage implements OnInit {

  private readonly categoryService =
    inject(CategoryService);

  private readonly authService =
    inject(AuthService);

  readonly categories =
    signal<ListCategoryItem[]>([]);

  get isAdmin(): boolean {

    return this.authService
      .currentUser()
      ?.role === 'Admin';
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {

    this.categoryService
      .list(1, 10)
      .subscribe({
        next: (response) => {

          this.categories.set(
            response.collection ?? []
          );

        }
      });
  }

  deleteCategory(id: string): void {

    const confirmed =
      confirm(
        '¿Desea eliminar esta categoría?'
      );

    if (!confirmed) {
      return;
    }

    this.categoryService
      .delete(id)
      .subscribe({
        next: () => {

          this.loadCategories();

        },
        error: (error) => {

          console.error(error);

          alert(
            'Error al eliminar categoría'
          );
        }
      });
  }
}