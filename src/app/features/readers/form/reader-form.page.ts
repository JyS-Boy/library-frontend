import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReaderService } from '../../../core/services/reader.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-reader-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reader-form.page.html',
  styleUrls: ['./reader-form.page.scss']
})
export class ReaderFormPage {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly readerService = inject(ReaderService);
  private readonly alertService = inject(AlertService);

  loading = false;

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.readerService
      .create({
        fullName: this.form.value.fullName!,
        email: this.form.value.email!,
        phoneNumber: this.form.value.phoneNumber!
      })
      .subscribe({
        next: async () => {
          this.loading = false;
          await this.alertService.success('Lector registrado', 'El lector fue registrado correctamente.');
          this.router.navigate(['/readers']);
        },
        error: async (error) => {
          this.loading = false;
          await this.alertService.error('Error', error.error?.message ?? 'No fue posible registrar el lector.');
        }
      });
  }
}