import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertService } from '../../../core/services/alert.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss']
})

export class CategoryFormPage {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly categoryService = inject(CategoryService);
  private readonly alertService = inject(AlertService);

  loading = false;

  form = this.fb.group({ name: ['', Validators.required] });

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.categoryService.create({ name: this.form.value.name! })
      .subscribe({
        next: async () => {
          this.loading = false;
          await this.alertService.success('Categoría creada', 'La categoría fue registrada correctamente.');
          this.router.navigate(['/categories']);
        },
        error: async (error) => {
          this.loading = false;
          await this.alertService.error('Error', error.error?.message ?? 'No fue posible registrar la categoría.');
        }
      });
  }
}