import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

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

  private readonly router =
    inject(Router);

  private readonly categoryService =
    inject(CategoryService);

  loading = false;

  form = this.fb.group({
    name: ['', Validators.required]
  });

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.categoryService
      .create({
        name: this.form.value.name!
      })
      .subscribe({
        next: () => {

          this.loading = false;

          this.router.navigate([
            '/categories'
          ]);
        },
        error: () => {

          this.loading = false;

          alert(
            'Error al crear categoría'
          );
        }
      });
  }
}