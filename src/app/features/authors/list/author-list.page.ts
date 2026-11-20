import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { ListAuthorItem } from '../../../core/models/author.model';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';


@Component({
    selector: 'app-author-list-page',
    standalone: true,
    imports: [CommonModule, RouterLink, PaginationComponent],
    providers: [AlertService],
    templateUrl: './author-list.page.html',
    styleUrls: ['./author-list.page.scss']
})
export class AuthorListPage implements OnInit {

    private readonly authorService = inject(AuthorService);
    private readonly authService = inject(AuthService);
    private readonly alertService = inject(AlertService);

    get isAdmin(): boolean {
        return this.authService
            .currentUser()
            ?.role === 'Admin';
    }

    readonly authors = signal<ListAuthorItem[]>([]);
    readonly pageNumber = signal(1);
    readonly pageSize = signal(10);
    readonly totalPages = signal(0);

    ngOnInit(): void {
        this.loadAuthors();
    }

    previousPage(): void {
        if (this.pageNumber() > 1) {
            this.pageNumber.update(page => page - 1);
            this.loadAuthors();
        }
    }

    nextPage(): void {
        if (this.pageNumber() < this.totalPages()) {
            this.pageNumber.update(page => page + 1);
            this.loadAuthors();
        }
    }

    loadAuthors(): void {
        this.authorService
            .list(this.pageNumber(), this.pageSize())
            .subscribe({
                next: response => {
                    this.authors.set(response.collection ?? []);
                    this.totalPages.set(response.totalPages ?? 0);
                }
            });
    }

    async deleteAuthor(id: string, name: string): Promise<void> {
        const confirmed = await this.alertService.confirm('Eliminar Autor', `¿Desea eliminar al autor "${name}"?`);

        if (!confirmed) {
            return;
        }

        this.authorService
            .delete(id)
            .subscribe({
                next: async () => {
                    await this.alertService.success('Autor eliminado', `El autor ha sido eliminado correctamente.`);
                    this.loadAuthors();
                },
                error: async (error) => {
                    console.error(error);
                    await this.alertService.error('Error al eliminar autor', `Error: ${error.status} - ${error.message}`);
                }
            });
    }
}