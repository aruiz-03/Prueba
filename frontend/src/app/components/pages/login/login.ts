import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, ButtonComponent],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-header">
          <h2>¡Bienvenido!</h2>
          <p>Inicia sesión para continuar</p>
        </div>
        @if (errorMessage()) {
          <div class="error-message">
            <span class="error-icon">⚠️</span>
            {{ errorMessage() }}
          </div>
        }
        <app-input-field
          placeholder="Usuario"
          [value]="username()"
          (valueChange)="username.set($event)"
        />
        <app-input-field
          type="password"
          placeholder="Contraseña"
          [value]="password()"
          (valueChange)="password.set($event)"
        />
        <app-button variant="primary" (click)="login()">Ingresar</app-button>
        <div class="auth-footer">
          <p>¿No tienes cuenta? <a routerLink="/register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .auth-card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      padding: 40px;
      width: 100%;
      max-width: 420px;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .auth-header h2 {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    .auth-header p {
      color: var(--text-secondary);
      font-size: 14px;
    }
    app-input-field {
      display: block;
      margin-bottom: 16px;
    }
    app-button {
      width: 100%;
      margin-bottom: 16px;
    }
    .error-message {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 12px;
      border-radius: var(--radius);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }
    .error-icon {
      font-size: 16px;
    }
    .auth-footer {
      text-align: center;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }
    .auth-footer p {
      color: var(--text-secondary);
      font-size: 14px;
    }
    .auth-footer a {
      color: var(--primary);
      font-weight: 500;
      text-decoration: none;
    }
    .auth-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  errorMessage = signal('');

  login(): void {
    const result = this.authService.login({
      username: this.username(),
      password: this.password()
    });

    if (result.success) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage.set(result.message);
    }
  }
}
