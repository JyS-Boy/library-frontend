import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AlertService } from '../../../core/services/alert.service';
import { RouterLink } from '@angular/router';
import { LoanService } from '../../../core/services/loan.service';
import { LoanListItem } from '../../../core/models/loan.model';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
    selector: 'app-loan-list-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        PaginationComponent
    ],
    templateUrl: './loan-list.page.html',
    styleUrls: ['./loan-list.page.scss']
})

export class LoanListPage implements OnInit {
    private readonly loanService = inject(LoanService);
    private readonly alertService = inject(AlertService);

    readonly loans = signal<LoanListItem[]>([]);
    readonly pageNumber = signal(1);
    readonly pageSize = signal(10);
    readonly totalPages = signal(0);

    loading = false;

    ngOnInit(): void {
        this.loadLoans();
    }
    nextPage(): void {
        if (this.pageNumber() < this.totalPages()) {
            this.pageNumber.update(page => page + 1);
            this.loadLoans();
        }
    }

    previousPage(): void {
        if (this.pageNumber() > 1) {
            this.pageNumber.update(page => page - 1);
            this.loadLoans();
        }
    }

    loadLoans(): void {
        this.loanService.list(this.pageNumber(), this.pageSize())
            .subscribe({
                next: response => {
                    this.loans.set(response.collection ?? []);
                    this.totalPages.set(response.totalPages ?? 0);
                }
            });
    }

    async returnLoan(id: string): Promise<void> {
        const confirmed = await this.alertService.confirm('Devolver préstamo','¿Desea registrar la devolución del préstamo?');

        if (!confirmed) {
            return;
        }
        this.loading = true;
        this.loanService.returnLoan(id)
            .subscribe({
                next: async () => {
                    this.loading = false;
                    await this.alertService.success('Préstamo devuelto','El préstamo ha sido devuelto correctamente');
                    this.loadLoans();
                },
                error: async error => {
                    this.loading = false;
                    console.error(error);
                    await this.alertService.error('Error',error.error?.message ?? 'No se pudo devolver el préstamo');
                }
            });
    }
}