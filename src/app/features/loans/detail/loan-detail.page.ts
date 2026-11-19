import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Loan } from '../../../core/models/loan.model';
import { LoanService } from '../../../core/services/loan.service';

@Component({
  selector: 'app-loan-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-detail.page.html',
  styleUrls: ['./loan-detail.page.scss']
})
export class LoanDetailPage implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly loanService =
    inject(LoanService);

  readonly loan =
    signal<Loan | null>(null);

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.loanService
      .getById(id)
      .subscribe({
        next: loan => {

          this.loan.set(loan);

        }
      });
  }
}