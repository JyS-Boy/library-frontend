import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Category } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss']
})
export class CategoryDetailPage implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly categoryService =
    inject(CategoryService);

  readonly category =
    signal<Category | null>(null);

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.categoryService
      .getById(id)
      .subscribe({
        next: (category) => {
          this.category.set(category);
        }
      });
  }
}