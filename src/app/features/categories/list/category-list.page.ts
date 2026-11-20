import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CategoryService } from '../../../core/services/category.service';
import { ListCategoryItem } from '../../../core/models/category.model';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-category-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PaginationComponent
  ],
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss']
})

export class CategoryListPage implements OnInit {

  private readonly categoryService = inject(CategoryService);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);

  readonly categories = signal<ListCategoryItem[]>([]);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly totalPages = signal(0);

  get isAdmin(): boolean {
    return this.authService.currentUser()?.role === 'Admin';
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  previousPage(): void {
    if (this.pageNumber() > 1) {
      this.pageNumber.update(page => page - 1);
      this.loadCategories();
    }
  }

  nextPage(): void {
    if (this.pageNumber() < this.totalPages()) {
      this.pageNumber.update(page => page + 1);
      this.loadCategories();
    }
  }

  loadCategories(): void {
    this.categoryService
      .list(this.pageNumber(), this.pageSize())
      .subscribe({
        next: response => {
          this.categories.set(response.collection ?? []);
          this.totalPages.set(response.totalPages ?? 0);
        }
      });
  }

  async deleteCategory(id: string, name: string): Promise<void> {

    const confirmed = await this.alertService.confirm('Eliminar categoría', `¿Desea eliminar la categoría "${name}"?`);

    if (!confirmed) {
      return;
    }

    this.categoryService
      .delete(id)
      .subscribe({
        next: async () => {
          await this.alertService.success('Categoría eliminada','La operación se realizó correctamente.');
          this.loadCategories();
        },
        error: async error => {
          console.error(error);
          await this.alertService.error('Error', error.error?.message ?? 'Ocurrió un error inesperado');

        }
      });

  }
}