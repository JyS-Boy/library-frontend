import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { LoanService } from '../../../core/services/loan.service';

import {
  LoanListItem
} from '../../../core/models/loan.model';

@Component({
  selector: 'app-loan-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './loan-list.page.html',
  styleUrls: ['./loan-list.page.scss']
})
export class LoanListPage implements OnInit {

  private readonly loanService =
    inject(LoanService);

  readonly loans =
    signal<LoanListItem[]>([]);

  ngOnInit(): void {

    this.loadLoans();

  }

  loadLoans(): void {

    this.loanService
      .list()
      .subscribe({
        next: loans => {

          this.loans.set(loans);

        }
      });
  }
}