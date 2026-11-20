import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
    selector: 'app-user-edit-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './user-edit.page.html',
    styleUrls: ['./user-edit.page.scss']
})

export class UserEditPage implements OnInit {

    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly userService = inject(UserService);
    private readonly alertService =  inject(AlertService);

    private userId = '';
    loading = false;

    form = this.fb.group({
        userName: ['', Validators.required],
        role: ['', Validators.required]
    });

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (!id)
            return;

        this.userId = id;
        this.loadUser();
    }

    private loadUser(): void {
        this.userService
            .getById(this.userId)
            .subscribe({
                next: user => {
                    this.form.patchValue({
                        userName: user.userName,
                        role: user.role
                    });
                }
            });
    }

    submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.userService
            .update(this.userId,
                {
                    userName: this.form.value.userName!,
                    role: this.form.value.role!
                }
            )
            .subscribe({
                next: async () => {
                    this.loading = false;
                    await this.alertService.success('Usuario actualizado', 'Usuario actualizado correctamente.');
                    this.router.navigate(['/users']);
                },
                error: async error => {
                    console.error(error);
                    this.loading = false;
                    await this.alertService.error('Error', error.error?.message ?? 'No fue posible actualizar el usuario.');
                }
            });
    }
}