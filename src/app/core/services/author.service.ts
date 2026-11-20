import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_ROUTES } from '../constants/api-routes.constants';
import { ApiResult, PagedResult } from '../models/api-result.model';
import { Author, CreateAuthorRequest, ListAuthorItem, UpdateAuthorRequest } from '../models/author.model';
import { ApiFactoryService } from './api-factory.service';

@Injectable({
  providedIn: 'root',
})

export class AuthorService {
  private readonly httpClient = inject(HttpClient);
  private readonly factory = inject(ApiFactoryService);

  private get baseUrl(): string {
    return this.factory.create(API_ROUTES.AUTHORS.BASE).url;
  }

  list(pageNumber: number, pageSize: number): Observable<PagedResult<ListAuthorItem[]>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient
      .get<ApiResult<PagedResult<ListAuthorItem[]>>>(this.baseUrl, { params })
      .pipe(map(result => result.value as PagedResult<ListAuthorItem[]>));
  }

  getById(id: string): Observable<Author> {
    return this.httpClient
      .get<ApiResult<Author>>(`${this.baseUrl}/${id}`)
      .pipe(map(result => result.value!));
  }

  create(request: CreateAuthorRequest): Observable<ApiResult> {
    return this.httpClient.post<ApiResult>(this.baseUrl, request);
  }

  update(id: string, request: UpdateAuthorRequest): Observable<ApiResult> {
    return this.httpClient.put<ApiResult>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<ApiResult> {
    return this.httpClient.delete<ApiResult>(`${this.baseUrl}/${id}`);
  }
}