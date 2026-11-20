import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-user-detail-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-detail.page.html',
    styleUrls: ['./user-detail.page.scss']
})
export class UserDetailPage implements OnInit {
    
    private readonly route = inject(ActivatedRoute);
    private readonly userService = inject(UserService);

    readonly user = signal<User | null>(null);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (!id) {
            return;
        }

        this.userService.getById(id)
            .subscribe({
                next: user => {
                    this.user.set(user);
                }
            });
    }
}