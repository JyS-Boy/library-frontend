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

import { ReaderService } from '../../../core/services/reader.service';

@Component({
  selector: 'app-reader-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reader-edit.page.html',
  styleUrls: ['./reader-edit.page.scss']
})
export class ReaderEditPage implements OnInit {

  private readonly fb = inject(FormBuilder);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly readerService =
    inject(ReaderService);

  private readerId = '';

  loading = false;

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.readerId = id;

    this.readerService
      .getById(id)
      .subscribe({
        next: reader => {

          this.form.patchValue({
            fullName: reader.fullName,
            email: reader.email,
            phoneNumber: reader.phoneNumber
          });

        }
      });
  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.readerService
      .update(
        this.readerId,
        {
          fullName:
            this.form.value.fullName!,
          email:
            this.form.value.email!,
          phoneNumber:
            this.form.value.phoneNumber!
        }
      )
      .subscribe({
        next: () => {

          this.loading = false;

          this.router.navigate([
            '/readers'
          ]);

        },
        error: () => {

          this.loading = false;

          alert(
            'Error al actualizar lector'
          );

        }
      });
  }
}