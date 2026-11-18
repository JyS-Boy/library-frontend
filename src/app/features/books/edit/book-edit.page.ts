import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { AuthorService } from '../../../core/services/author.service';
import { BookService } from '../../../core/services/book.service';
import { CategoryService } from '../../../core/services/category.service';

import {
  ListAuthorItem
} from '../../../core/models/author.model';

import {
  ListCategoryItem
} from '../../../core/models/category.model';

@Component({
  selector: 'app-book-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-edit.page.html',
  styleUrls: ['./book-edit.page.scss']
})
export class BookEditPage implements OnInit {

  private readonly fb =
    inject(FormBuilder);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly bookService =
    inject(BookService);

  private readonly authorService =
    inject(AuthorService);

  private readonly categoryService =
    inject(CategoryService);

  private bookId = '';

  readonly authors =
    signal<ListAuthorItem[]>([]);

  readonly categories =
    signal<ListCategoryItem[]>([]);

  loading = false;

  form = this.fb.group({
    title: ['', Validators.required],
    isbn: ['', Validators.required],
    stock: [1, Validators.required],
    publicationYear: [
      new Date().getFullYear(),
      Validators.required
    ],
    authorId: ['', Validators.required],
    categoryId: ['', Validators.required]
  });

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.bookId = id;

    this.loadAuthors();
    this.loadCategories();
    this.loadBook(id);
  }

  private loadAuthors(): void {

    this.authorService
      .list(1, 100)
      .subscribe({
        next: response => {

          this.authors.set(
            response.collection ?? []
          );

        }
      });
  }

  private loadCategories(): void {

    this.categoryService
      .list(1, 100)
      .subscribe({
        next: response => {

          this.categories.set(
            response.collection ?? []
          );

        }
      });
  }

  private loadBook(id: string): void {

    this.bookService
      .getById(id)
      .subscribe({
        next: book => {
          this.form.patchValue({
            title: book.title,
            isbn: book.isbn,
            stock: book.stock,
            publicationYear: book.publicationYear,
            authorId: book.authorId,
            categoryId: book.categoryId
            });
        }
    });
  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.bookService
      .update(
        this.bookId,
        {
          title: this.form.value.title!,
          isbn: this.form.value.isbn!,
          stock: Number(this.form.value.stock),
          publicationYear: Number(
            this.form.value.publicationYear
          ),
          authorId: this.form.value.authorId!,
          categoryId: this.form.value.categoryId!
        }
      )
      .subscribe({
        next: () => {

          this.loading = false;

          this.router.navigate([
            '/books'
          ]);

        },
        error: (error) => {

          console.error(error);

          this.loading = false;

          alert('Error al actualizar libro');

        }
      });
  }
}