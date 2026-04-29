import { Injectable, signal, computed } from '@angular/core';
import { User, CurrentUser, LoginCredentials, RegisterData } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  private currentUserSignal = signal<CurrentUser | null>(this.loadCurrentUser());

  currentUser = computed(() => this.currentUserSignal());
  isAuthenticated = computed(() => this.currentUserSignal() !== null);

  private loadCurrentUser(): CurrentUser | null {
    const stored = localStorage.getItem(this.CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  private getUsers(): User[] {
    const stored = localStorage.getItem(this.USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(data: RegisterData): { success: boolean; message: string } {
    if (data.password !== data.confirmPassword) {
      return { success: false, message: 'Las contraseñas no coinciden' };
    }

    const users = this.getUsers();
    if (users.find(u => u.username === data.username)) {
      return { success: false, message: 'El usuario ya existe' };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username: data.username,
      password: data.password
    };

    users.push(newUser);
    this.saveUsers(users);
    return { success: true, message: 'Registro exitoso' };
  }

  login(credentials: LoginCredentials): { success: boolean; message: string } {
    const users = this.getUsers();
    const user = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    const { password, ...userWithoutPassword } = user;
    const currentUser: CurrentUser = { id: userWithoutPassword.id, username: userWithoutPassword.username };
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser));
    this.currentUserSignal.set(currentUser);
    return { success: true, message: 'Login exitoso' };
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSignal.set(null);
  }
}
