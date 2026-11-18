import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { ListBookItem } from '../../../core/models/book.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-book-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss']
})
export class BookListPage implements OnInit {

  private readonly bookService = inject(BookService);
  private readonly authService = inject(AuthService);

  readonly books = signal<ListBookItem[]>([]);

  ngOnInit(): void {
    this.loadBooks();
  }

  get isAdmin(): boolean {
    return this.authService
    .currentUser()
    ?.role === 'Admin';
  }

  loadBooks(): void {

    this.bookService.list(1, 10).subscribe({next: response => 
      {
        this.books.set(response.collection ?? []);
      }
    });
  }

  deleteBook(id: string): void {
    const confirmed = confirm('¿Desea eliminar este libro?');

    if (!confirmed) {
      return;
    }

    this.bookService.delete(id).subscribe({next: () => 
      {
        this.loadBooks();
      },
      error: (error) => {
        console.error(error);
        alert('Error al eliminar libro');
      }
    });
}
}