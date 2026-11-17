import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable, tap } from 'rxjs';

import { ApiFactoryService } from './api-factory.service';
import { API_ROUTES } from '../constants/api-routes.constants';
import {
  CurrentUser,
  LoginRequest,
  LoginResponse,
} from '../models/auth.model';
import { ApiResult } from '../models/api-result.model';

const SESSION_KEY = 'session';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiFactory = inject(ApiFactoryService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly loginEndpoint =
    this.apiFactory.create(API_ROUTES.AUTH.LOGIN).url;

  private readonly _currentUser = signal<CurrentUser | null>(
    this.loadFromSession()
  );

  readonly currentUser = this._currentUser.asReadonly();

  readonly isLoggedIn = computed(
    () => this._currentUser() !== null
  );

login(request: LoginRequest): Observable<CurrentUser> {
  return this.httpClient
    .post<LoginResponse>(
      this.loginEndpoint,
      request
    )
    .pipe(
      map((data) => {

        const user: CurrentUser = {
          userName: data.userName,
          role: data.role,
          token: data.token,
          expiresAt: data.expiration,
        };

        return user;
      }),
      tap((user) => this.setSession(user))
    );
}

  logout(): void {
    this._currentUser.set(null);

    const storage = this.getSessionStorage();

    if (storage) {
      storage.removeItem(SESSION_KEY);
      storage.removeItem(TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return (
      this._currentUser() !== null ||
      this.token() !== null
    );
  }

  token(): string | null {
    const tokenFromSignal =
      this._currentUser()?.token;

    if (tokenFromSignal) {
      return tokenFromSignal;
    }

    const tokenFromStorage =
      this.getSessionStorage()?.getItem(TOKEN_KEY);

    return tokenFromStorage?.trim()
      ? tokenFromStorage
      : null;
  }

  private loadFromSession(): CurrentUser | null {
    const storage = this.getSessionStorage();

    if (storage) {
      const sessionData =
        storage.getItem(SESSION_KEY);

      if (sessionData) {
        return JSON.parse(sessionData) as CurrentUser;
      }
    }

    return null;
  }

  private setSession(user: CurrentUser): void {
    this._currentUser.set(user);

    const storage = this.getSessionStorage();

    if (storage) {
      storage.setItem(
        SESSION_KEY,
        JSON.stringify(user)
      );

      storage.setItem(
        TOKEN_KEY,
        user.token
      );
    }
  }

  private getSessionStorage(): Storage | null {
    if (
      !this.isBrowser ||
      typeof sessionStorage === 'undefined'
    ) {
      return null;
    }

    return sessionStorage;
  }
}