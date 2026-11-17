export interface ApiResult<T = unknown> {
    value?: T;
    isSuccess: boolean;
    isFailure: boolean;
    message: string;
    errors?: string[];
}

export interface PagedResult<T = unknown> {
    collection?: T;
    totalCount: number;
    totalPages: number;
    totalRowsPerPage: number;
}