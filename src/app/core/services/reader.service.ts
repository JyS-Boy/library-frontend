import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { API_ROUTES } from '../constants/api-routes.constants';
import { ApiResult, PagedResult } from '../models/api-result.model';

import {
  Reader,
  ListReaderItem,
  CreateReaderRequest,
  UpdateReaderRequest
} from '../models/reader.model';

import { ApiFactoryService } from './api-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private readonly httpClient =
    inject(HttpClient);

  private readonly factory =
    inject(ApiFactoryService);

  private get baseUrl(): string {
    return this.factory
      .create(API_ROUTES.READERS.BASE)
      .url;
  }

  list(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResult<ListReaderItem[]>> {

    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient
      .get<ApiResult<PagedResult<ListReaderItem[]>>>(
        this.baseUrl,
        { params }
      )
      .pipe(
        map(result =>
          result.value as PagedResult<ListReaderItem[]>
        )
      );
  }

  getById(id: string): Observable<Reader> {

    return this.httpClient
      .get<ApiResult<Reader>>(
        `${this.baseUrl}/${id}`
      )
      .pipe(
        map(result => result.value!)
      );
  }

  create(
    request: CreateReaderRequest
  ): Observable<ApiResult> {

    return this.httpClient.post<ApiResult>(
      this.baseUrl,
      request
    );
  }

  update(
    id: string,
    request: UpdateReaderRequest
  ): Observable<ApiResult> {

    return this.httpClient.put<ApiResult>(
      `${this.baseUrl}/${id}`,
      request
    );
  }

  delete(id: string): Observable<ApiResult> {

    return this.httpClient.delete<ApiResult>(
      `${this.baseUrl}/${id}`
    );
  }
}
