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

import { AuthorService } from '../../../core/services/author.service';

@Component({
  selector: 'app-author-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './author-edit.page.html',
  styleUrls: ['./author-edit.page.scss']
})
export class AuthorEditPage implements OnInit {

  private readonly fb = inject(FormBuilder);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly authorService =
    inject(AuthorService);

  private authorId = '';

  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    country: ['', Validators.required]
  });

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.authorId = id;

    this.authorService
      .getById(id)
      .subscribe({
        next: author => {

          this.form.patchValue({
            name: author.name,
            country: author.country
          });
        }
      });
  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authorService
      .update(
        this.authorId,
        {
          name: this.form.value.name!,
          country: this.form.value.country!
        }
      )
      .subscribe({
        next: () => {

          this.loading = false;

          this.router.navigate(['/authors']);
        },
        error: () => {

          this.loading = false;

          alert('Error al actualizar');
        }
      });
  }
}