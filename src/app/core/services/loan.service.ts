import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_ROUTES } from '../constants/api-routes.constants';
import { ApiResult } from '../models/api-result.model';
import { Loan, LoanListItem, CreateLoanRequest } from '../models/loan.model';
import { ApiFactoryService } from './api-factory.service';
import { HttpParams } from '@angular/common/http';
import { PagedResult } from '../models/api-result.model';

@Injectable({ providedIn: 'root' })

export class LoanService {

    private readonly httpClient = inject(HttpClient);
    private readonly factory = inject(ApiFactoryService);
    private get baseUrl(): string {
        return this.factory.create(API_ROUTES.LOANS.BASE).url;
    }

    list(pageNumber: number, pageSize: number): Observable<PagedResult<LoanListItem[]>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString());

        return this.httpClient
            .get<ApiResult<PagedResult<LoanListItem[]>>>(this.baseUrl, { params })
            .pipe(map(result => result.value!));
    }

    getById(id: string): Observable<Loan> {
        return this.httpClient
            .get<ApiResult<Loan>>(`${this.baseUrl}/${id}`)
            .pipe(map(result => result.value!));
    }

    create(request: CreateLoanRequest): Observable<ApiResult> {
        return this.httpClient.post<ApiResult>(this.baseUrl, request);
    }

    returnLoan(id: string): Observable<ApiResult> {
        return this.httpClient.post<ApiResult>(`${this.baseUrl}/${id}/return`, {});
    }
}