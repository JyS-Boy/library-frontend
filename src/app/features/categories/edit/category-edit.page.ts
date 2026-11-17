import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss']
})
export class CategoryEditPage implements OnInit {

  private readonly fb = inject(FormBuilder);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly categoryService =
    inject(CategoryService);

  private categoryId = '';

  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.categoryId = id;

    this.categoryService
      .getById(id)
      .subscribe({
        next: category => {

          this.form.patchValue({
            name: category.name,
            description: category.description
          });

        }
      });
  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.categoryService
      .update(
        this.categoryId,
        {
          name: this.form.value.name!,
          description:
            this.form.value.description ?? ''
        }
      )
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
            'Error al actualizar categoría'
          );

        }
      });
  }
}