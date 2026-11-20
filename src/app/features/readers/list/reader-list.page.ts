import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReaderService } from '../../../core/services/reader.service';
import { AuthService } from '../../../core/services/auth.service';
import { ListReaderItem } from '../../../core/models/reader.model';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-reader-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './reader-list.page.html',
  styleUrls: ['./reader-list.page.scss']
})
export class ReaderListPage implements OnInit {

  private readonly readerService = inject(ReaderService);
  private readonly authService = inject(AuthService);

  readonly readers = signal<ListReaderItem[]>([]);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly totalPages = signal(0);

  ngOnInit(): void {
    this.loadReaders();
  }

  get isAdmin(): boolean {
    return this.authService.currentUser()?.role === 'Admin';
  }

  loadReaders(): void {
    this.readerService.list(this.pageNumber(), this.pageSize())
      .subscribe({
        next: response => {
          this.readers.set(response.collection ?? []);
          this.totalPages.set(response.totalPages ?? 0);
        }
      });
  }

  nextPage(): void {
    if (this.pageNumber() < this.totalPages()) {
      this.pageNumber.update(page => page + 1);
      this.loadReaders();
    }
  }

  previousPage(): void {
    if (this.pageNumber() > 1) {
      this.pageNumber.update(page => page - 1);
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