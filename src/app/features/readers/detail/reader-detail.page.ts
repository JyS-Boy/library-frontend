import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Reader } from '../../../core/models/reader.model';
import { ReaderService } from '../../../core/services/reader.service';

@Component({
  selector: 'app-reader-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reader-detail.page.html',
  styleUrls: ['./reader-detail.page.scss']
})
export class ReaderDetailPage implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly readerService =
    inject(ReaderService);

  readonly reader =
    signal<Reader | null>(null);

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.readerService
      .getById(id)
      .subscribe({
        next: reader => {

          this.reader.set(reader);

        }
      });
  }
}