import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { ListAuthorItem } from '../../../core/models/author.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-author-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './author-list.page.html',
  styleUrls: ['./author-list.page.scss']
})
export class AuthorListPage implements OnInit {

  private readonly authorService = inject(AuthorService);
  private readonly authService = inject(AuthService);
 
  get isAdmin(): boolean {
   return this.authService
   .currentUser()
   ?.role === 'Admin';
 }

  readonly authors = signal<ListAuthorItem[]>([]);

  ngOnInit(): void {
    this.loadAuthors();
  }

    loadAuthors(): void {
        this.authorService
        .list(1, 10)
        .subscribe({
            next: (response) => {
                console.log('RESPONSE',response);
            this.authors.set(
                response.collection ?? []
            );

                console.log('AUTHORS', this.authors());
        },
        error: (err) => {
          console.error('ERROR', err);
        }
      });
    }

    deleteAuthor(id: string): void {
        const confirmed =
            confirm('¿Desea eliminar este autor?');

        if (!confirmed) {
            return;
        }

        this.authorService
        .delete(id)
        .subscribe({
        next: () => {

            this.loadAuthors();

        },
        error: (error) => {
            console.error(error);
           alert(`Error: ${error.status} - ${error.message}`
        );
        }
        });
    }
}