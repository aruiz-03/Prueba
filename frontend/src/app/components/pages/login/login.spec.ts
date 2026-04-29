import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonComponent } from '../../atoms/button/button';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = {
      login: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule.withRoutes([]), InputFieldComponent, ButtonComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate');
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login on login', () => {
    component.username.set('testuser');
    component.password.set('password');
    mockAuthService.login.mockReturnValue({ success: true, message: '' });
    
    component.login();
    
    expect(mockAuthService.login).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password'
    });
  });

  it('should navigate to home on successful login', () => {
    component.username.set('testuser');
    component.password.set('password');
    mockAuthService.login.mockReturnValue({ success: true, message: '' });
    
    component.login();
    
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set error message on failed login', () => {
    component.username.set('testuser');
    component.password.set('wrong');
    mockAuthService.login.mockReturnValue({ success: false, message: 'Invalid credentials' });
    
    component.login();
    
    expect(component.errorMessage()).toBe('Invalid credentials');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
