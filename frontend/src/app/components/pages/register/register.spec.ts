import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonComponent } from '../../atoms/button/button';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: any;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = {
      register: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule.withRoutes([]), InputFieldComponent, ButtonComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate');
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.register on register', () => {
    component.username.set('newuser');
    component.password.set('password');
    component.confirmPassword.set('password');
    mockAuthService.register.mockReturnValue({ success: true, message: 'Registered' });
    
    component.register();
    
    expect(mockAuthService.register).toHaveBeenCalledWith({
      username: 'newuser',
      password: 'password',
      confirmPassword: 'password'
    });
  });

  it('should set success message on successful registration', () => {
    component.username.set('newuser');
    component.password.set('password');
    component.confirmPassword.set('password');
    mockAuthService.register.mockReturnValue({ success: true, message: 'Registered' });
    
    component.register();
    
    expect(component.successMessage()).toBe('Registered');
    expect(component.errorMessage()).toBe('');
  });

  it('should set error message on failed registration', () => {
    component.username.set('newuser');
    component.password.set('password');
    component.confirmPassword.set('different');
    mockAuthService.register.mockReturnValue({ success: false, message: 'Passwords do not match' });
    
    component.register();
    
    expect(component.errorMessage()).toBe('Passwords do not match');
    expect(component.successMessage()).toBe('');
  });
});
