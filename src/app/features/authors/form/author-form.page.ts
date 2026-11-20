import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-author-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './author-form.page.html',
  styleUrls: ['./author-form.page.scss']
})
export class AuthorFormPage {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authorService = inject(AuthorService);
  private readonly alertService = inject(AlertService);

  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    country: ['', Validators.required]
  });

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authorService
      .create({
        name: this.form.value.name!,
        country: this.form.value.country!
      })
      .subscribe({
        next: async () => {
          this.loading = false;
          await this.alertService.success('Autor creado', 'El autor fue registrado correctamente.');
          this.router.navigate(['/authors']);
        },
        error: async (error) => {
          this.loading = false;
          await this.alertService.error('Error', error.error?.message ?? 'No fue posible registrar el autor.');
        }
      });
  }
}