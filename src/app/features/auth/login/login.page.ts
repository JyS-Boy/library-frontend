import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  loading = false;
  hidePassword = true;
  sessionExpiredMessage = false;

  form = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.sessionExpiredMessage =
        params['expired'] === 'true';
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    const { userName, password } = this.form.value;

    this.loading = true;

    this.authService.login({
      userName: userName!,
      password: password!
    })
      .subscribe({
        next: () => {

          this.loading = false;

          this.router.navigate(['/dashboard']);
        },
        error: (_: HttpErrorResponse) => {

          this.loading = false;

          alert('Usuario o contraseña incorrectos');
        }
      });
  }
}