import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
    selector: 'app-user-form-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './user-form.page.html',
    styleUrls: ['./user-form.page.scss']
})

export class UserFormPage {

    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly userService = inject(UserService);
    private readonly alertService = inject(AlertService);

    loading = false;

    form = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
        role: ['Librarian', Validators.required]
    });

    submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.userService.create({
            userName: this.form.value.userName!,
            password: this.form.value.password!,
            role: this.form.value.role!
        })
            .subscribe({
                next: async () => {
                    this.loading = false;
                    await this.alertService.success('Usuario creado', 'Usuario creado correctamente.');
                    this.router.navigate(['/users']);
                },
                error: async error => {
                    console.error(error);
                    this.loading = false;
                    await this.alertService.error('Error', error.error?.message ?? 'No fue posible crear el usuario.');
                }
            });
    }
}