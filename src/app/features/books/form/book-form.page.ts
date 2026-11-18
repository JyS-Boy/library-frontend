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

import { Router } from '@angular/router';

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
  selector: 'app-book-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-form.page.html',
  styleUrls: ['./book-form.page.scss']
})
export class BookFormPage implements OnInit {

  private readonly fb =
    inject(FormBuilder);

  private readonly router =
    inject(Router);

  private readonly bookService =
    inject(BookService);

  private readonly authorService =
    inject(AuthorService);

  private readonly categoryService =
    inject(CategoryService);

  readonly authors =
    signal<ListAuthorItem[]>([]);

  readonly categories =
    signal<ListCategoryItem[]>([]);

  loading = false;

  form = this.fb.group({
    title: ['', Validators.required],

    isbn: ['', Validators.required],

    stock: [
      1,
      Validators.required
    ],

    publicationYear: [
      new Date().getFullYear(),
      Validators.required
    ],

    authorId: ['', Validators.required],

    categoryId: ['', Validators.required]
  });

  ngOnInit(): void {

    this.loadAuthors();

    this.loadCategories();
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

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.bookService
      .create({
        title:
          this.form.value.title!,

        isbn:
          this.form.value.isbn!,

        stock:
          Number(
            this.form.value.stock
          ),

        publicationYear:
          Number(
            this.form.value.publicationYear
          ),

        authorId:
          this.form.value.authorId!,

        categoryId:
          this.form.value.categoryId!
      })
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

          alert(
            'Error al crear libro'
          );

        }
      });
  }
}