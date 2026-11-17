import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorService } from '../../../core/services/author.service';

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

  private readonly router =
    inject(Router);

  private readonly authorService =
    inject(AuthorService);

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
        next: () => {

          this.loading = false;

          this.router.navigate(['/authors']);
        },
        error: () => {

          this.loading = false;

          alert('Error al crear autor');
        }
      });
  }
}