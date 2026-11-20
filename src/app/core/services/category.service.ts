import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_ROUTES } from '../constants/api-routes.constants';
import { ApiResult, PagedResult } from '../models/api-result.model';
import { Category, CreateCategoryRequest, ListCategoryItem, UpdateCategoryRequest } from '../models/category.model';
import { ApiFactoryService } from './api-factory.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private readonly httpClient = inject(HttpClient);
  private readonly factory = inject(ApiFactoryService);
  private get baseUrl(): string {
    return this.factory.create(API_ROUTES.CATEGORIES.BASE).url;
  }

  list(pageNumber: number, pageSize: number): Observable<PagedResult<ListCategoryItem[]>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient
      .get<ApiResult<PagedResult<ListCategoryItem[]>>>(this.baseUrl, { params })
      .pipe(map(result => result.value as PagedResult<ListCategoryItem[]>));
  }

  getById(id: string): Observable<Category> {
    return this.httpClient
      .get<ApiResult<Category>>(`${this.baseUrl}/${id}`)
      .pipe(map(result => result.value!));
  }

  create(request: CreateCategoryRequest): Observable<ApiResult> {
    return this.httpClient.post<ApiResult>(this.baseUrl, request);
  }

  update(id: string, request: UpdateCategoryRequest): Observable<ApiResult> {
    return this.httpClient.put<ApiResult>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<ApiResult> {
    return this.httpClient.delete<ApiResult>(`${this.baseUrl}/${id}`);
  }
}