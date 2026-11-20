import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReaderService } from '../../../core/services/reader.service';
import { BookService } from '../../../core/services/book.service';
import { LoanService } from '../../../core/services/loan.service';
import { AuthService } from '../../../core/services/auth.service';
import { ListReaderItem } from '../../../core/models/reader.model';
import { ListBookItem } from '../../../core/models/book.model';
import { AlertService } from '../../../core/services/alert.service';

@Component({
    selector: 'app-loan-form-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './loan-form.page.html',
    styleUrls: ['./loan-form.page.scss']
})
export class LoanFormPage implements OnInit {

    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly readerService = inject(ReaderService);
    private readonly bookService = inject(BookService);
    private readonly loanService = inject(LoanService);
    private readonly authService = inject(AuthService);
    private readonly alertService = inject(AlertService);

    readonly readers = signal<ListReaderItem[]>([]);
    readonly books = signal<ListBookItem[]>([]);

    loading = false;

    form = this.fb.group({
        readerId: ['', Validators.required],
        expectedReturnDate: ['', Validators.required],
        details: this.fb.array([])
    });

    get details(): FormArray {
        return this.form.get('details') as FormArray;
    }

    addBook(): void {
        if (this.details.length >= 2) {
            return;
        }
        this.details.push(this.fb.group({
            bookId: ['', Validators.required]
        }));
    }

    removeBook(index: number): void {
        if (this.details.length === 1) {
            return;
        }
        this.details.removeAt(index);
    }

    ngOnInit(): void {
        this.addBook();
        this.loadReaders();
        this.loadBooks();
    }

    private loadReaders(): void {
        this.readerService
            .list(1, 100)
            .subscribe({
                next: response => {
                    this.readers.set(response.collection ?? []);
                }
            });
    }

    private loadBooks(): void {

        this.bookService
            .list(1, 100)
            .subscribe({
                next: response => {
                    this.books.set(response.collection ?? []);
                }
            });
    }

    submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        const currentUser = this.authService.currentUser();
        this.loanService
            .create({
                readerId: this.form.value.readerId!,
                librarian: currentUser?.userName ?? '',
                expectedReturnDate: this.form.value.expectedReturnDate!,
                details: this.details.value.map(
                    (detail: { bookId: string }) => ({
                        bookId: detail.bookId,
                        quantity: 1
                    })
                )
            })
            .subscribe({
                next: async () => {
                    this.loading = false;
                    await this.alertService.success('Préstamo registrado','El préstamo fue registrado correctamente.');
                    this.router.navigate(['/loans']);
                },
                error: async error => {
                    console.error(error);
                    this.loading = false;
                    await this.alertService.error('Error', error.error?.message ?? 'No fue posible registrar el préstamo.');
                }
            });
    }
}