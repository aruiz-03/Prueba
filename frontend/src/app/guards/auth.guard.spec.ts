import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/user.model';

describe('AuthGuard', () => {
  let authService: { isAuthenticated: jest.Mock };
  let router: { createUrlTree: jest.Mock };

  beforeEach(() => {
    authService = { isAuthenticated: jest.fn() };
    router = { createUrlTree: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should allow activation when user is authenticated', () => {
    authService.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBe(true);
  });

  it('should redirect to login when user is not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);
    const urlTree = {} as any;
    router.createUrlTree.mockReturnValue(urlTree);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBe(urlTree);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
