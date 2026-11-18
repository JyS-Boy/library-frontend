import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReaderService } from '../../../core/services/reader.service';
import { AuthService } from '../../../core/services/auth.service';
import { ListReaderItem } from '../../../core/models/reader.model';

@Component({
  selector: 'app-reader-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reader-list.page.html',
  styleUrls: ['./reader-list.page.scss']
})
export class ReaderListPage implements OnInit {

  private readonly readerService = inject(ReaderService);
  private readonly authService = inject(AuthService);
  readonly readers = signal<ListReaderItem[]>([]);

  ngOnInit(): void {
    this.loadReaders();
  }

  get isAdmin(): boolean {
    return this.authService.currentUser()?.role === 'Admin';
  }

  currentPage = signal(1);
  totalPages = signal(0);

  loadReaders(): void {
    this.readerService
      .list(
        this.currentPage(),
        10
      )
      .subscribe({
        next: response => {

          this.readers.set(
            response.collection ?? []
          );

          this.totalPages.set(
            response.totalPages ?? 0
          );
        }
      });
  }

  nextPage(): void {
    if (
      this.currentPage() <
      this.totalPages()
    ) {

      this.currentPage.update(
        page => page + 1
      );

      this.loadReaders();
    }
  }

  previousPage(): void {

    if (this.currentPage() > 1)
    {
      this.currentPage.update(page => page - 1);
      this.loadReaders();
    }
  } 

  deleteReader(id: string): void {
    const confirmed = confirm('¿Desea eliminar este lector?');

    if (!confirmed) {
      return;
    }

    this.readerService
      .delete(id)
      .subscribe({
        next: () => {
          this.loadReaders();
        },
        error: (error) => {

          console.error(error);

          alert(
            'Error al eliminar lector'
          );
      }
    });
}
}