import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListUserItem } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { AlertService } from '../../../core/services/alert.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
    selector: 'app-user-list-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        PaginationComponent
    ],
    templateUrl: './user-list.page.html',
    styleUrls: ['./user-list.page.scss']
})
export class UserListPage implements OnInit {
    private readonly userService = inject(UserService);
    private readonly alertService = inject(AlertService);

    readonly users = signal<ListUserItem[]>([]);
    readonly pageNumber = signal(1);
    readonly pageSize = signal(10);
    readonly totalPages = signal(0);

    ngOnInit(): void {
        this.loadUsers();
    }

    nextPage(): void {
        if (this.pageNumber() < this.totalPages()) {
            this.pageNumber.update(page => page + 1);
            this.loadUsers();
        }
    }

    previousPage(): void {
        if (this.pageNumber() > 1) {
            this.pageNumber.update(page => page - 1);
            this.loadUsers();
        }
    }

    loadUsers(): void {
        this.userService.list(this.pageNumber(), this.pageSize())
            .subscribe({
                next: response => {
                    this.users.set(response.collection ?? []);
                    this.totalPages.set(response.totalPages);
                },
                error: async error => {
                    console.error(error);
                    await this.alertService.error('Error', 'No fue posible cargar los usuarios.');
                }
            });
    }

    async deleteUser(id: string, userName: string): Promise<void> {

        const confirmed = await this.alertService.confirm('Eliminar usuario', `¿Desea eliminar el usuario ${userName}?`);

        if (!confirmed) {
            return;
        }

        this.userService
            .delete(id)
            .subscribe({
                next: async () => {
                    await this.alertService.success(
                        'Usuario eliminado',
                        'La operación se realizó correctamente.'
                    );
                    this.loadUsers();
                },
                error: async error => {
                    console.error(error);
                    await this.alertService.error('Error', error.error?.message ?? 'No fue posible eliminar el usuario.');
                }
            });

    }
}