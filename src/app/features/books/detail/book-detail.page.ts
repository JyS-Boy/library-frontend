import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Book } from '../../../core/models/book.model';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss']
})
export class BookDetailPage implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly bookService =
    inject(BookService);

  readonly book =
    signal<Book | null>(null);

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.bookService
      .getById(id)
      .subscribe({
        next: book => {

          this.book.set(book);

        }
      });
  }
}