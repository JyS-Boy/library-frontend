import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResult, PagedResult } from '../models/api-result.model';
import { User, ListUserItem, CreateUserRequest, UpdateUserRequest } from '../models/user.model';
import { ApiFactoryService } from './api-factory.service';
import { API_ROUTES } from '../constants/api-routes.constants';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private readonly httpClient = inject(HttpClient);
    private readonly factory = inject(ApiFactoryService);
    
    private get baseUrl(): string {
        return this.factory
            .create(API_ROUTES.USERS.BASE)
            .url;
    }

    list(pageNumber: number, pageSize: number): Observable<PagedResult<ListUserItem[]>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString());
        return this.httpClient
            .get<ApiResult<PagedResult<ListUserItem[]>>>(this.baseUrl, { params })
            .pipe(map(result => result.value!));
    }

    getById(id: string): Observable<User> {
        return this.httpClient.get<ApiResult<User>>(`${this.baseUrl}/${id}`)
            .pipe(map(result => result.value!));
    }

    create(request: CreateUserRequest): Observable<ApiResult> {
        return this.httpClient.post<ApiResult>(this.baseUrl, request);
    }

    update(id: string, request: UpdateUserRequest): Observable<ApiResult> {
        return this.httpClient.put<ApiResult>(`${this.baseUrl}/${id}`, request);
    }

    delete(id: string): Observable<ApiResult> {
        return this.httpClient.delete<ApiResult>(`${this.baseUrl}/${id}`);
    }
}