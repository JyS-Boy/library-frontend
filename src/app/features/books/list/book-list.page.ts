import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { ListBookItem } from '../../../core/models/book.model';
import { AuthService } from '../../../core/services/auth.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-book-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PaginationComponent
  ],
  providers: [AlertService],
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss']
})
export class BookListPage implements OnInit {

  private readonly bookService = inject(BookService);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);

  readonly books = signal<ListBookItem[]>([]);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly totalPages = signal(0);

  ngOnInit(): void {
    this.loadBooks();
  }

  get isAdmin(): boolean {
    return this.authService.currentUser()?.role === 'Admin';
  }

  nextPage(): void {

    if (this.pageNumber() < this.totalPages()) {
      this.pageNumber.update(page => page + 1);
      this.loadBooks();
    }
  }

  previousPage(): void {

    if (this.pageNumber() > 1) {
      this.pageNumber.update(page => page - 1);
      this.loadBooks();
    }
  }

  loadBooks(): void {
    this.bookService.list(this.pageNumber(), this.pageSize()).subscribe({
      next: response => {
        this.books.set(response.collection ?? []);
        this.totalPages.set(response.totalPages ?? 0);
      }
    });
  }

  async deleteBook(id: string, title: string): Promise<void> {

    const confirmed = await this.alertService.confirm('Eliminar libro', `¿Desea eliminar el libro "${title}"?`);

    if (!confirmed) {
      return;
    }

    this.bookService
      .delete(id)
      .subscribe({
        next: async () => {
          await this.alertService.success('Libro eliminado','La operación se realizó correctamente.');
          this.loadBooks();
        },
        error: async error => {
          console.error(error);
          await this.alertService.error('Error',error.error?.message ??'No fue posible eliminar el libro.');
        }
      });
  }
}