import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Author } from '../../../core/models/author.model';
import { AuthorService } from '../../../core/services/author.service';

@Component({
  selector: 'app-author-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-detail.page.html',
  styleUrls: ['./author-detail.page.scss']
})
export class AuthorDetailPage implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly authorService =
    inject(AuthorService);

  readonly author =
    signal<Author | null>(null);

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.authorService
      .getById(id)
      .subscribe({
        next: author => {
          this.author.set(author);
        }
      });
  }
}