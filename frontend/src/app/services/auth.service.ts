import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CurrentUser, LoginCredentials, RegisterData } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly CURRENT_USER_KEY = 'currentUser';
  private readonly API_URL = 'http://localhost:8080/api/auth';

  private currentUserSignal = signal<CurrentUser | null>(this.loadCurrentUser());

  currentUser = computed(() => this.currentUserSignal());
  isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor(private http: HttpClient) {}

  private loadCurrentUser(): CurrentUser | null {
    const stored = localStorage.getItem(this.CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, null, {
      params: { username: data.username, password: data.password }
    });
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, null, {
      params: { username: credentials.username, password: credentials.password }
    }).pipe(
      tap((response: any) => {
        const currentUser: CurrentUser = { id: response.id, username: response.username };
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser));
        this.currentUserSignal.set(currentUser);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSignal.set(null);
  }
}
