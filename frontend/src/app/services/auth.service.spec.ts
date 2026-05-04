import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrentUser, LoginCredentials, RegisterData } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:8080/api/auth';

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('loadCurrentUser', () => {
    it('should return null when no user in localStorage', () => {
      expect(service.currentUser()).toBeNull();
      expect(service.isAuthenticated()).toBeFalsy();
    });

    it('should load user from localStorage on init', () => {
      const user: CurrentUser = { id: '123', username: 'testuser' };
      localStorage.setItem('currentUser', JSON.stringify(user));

      const newService = new AuthService(TestBed.inject(HttpClientTestingModule) as any);
      expect(newService.currentUser()).toEqual(user);
      expect(newService.isAuthenticated()).toBeTruthy();
    });
  });

  describe('register', () => {
    it('should call register endpoint with correct params', () => {
      const data: RegisterData = { username: 'newuser', password: 'pass123', confirmPassword: 'pass123' };

      service.register(data).subscribe();

      const req = httpMock.expectOne(
        req => req.url === `${API_URL}/register` && req.params.get('username') === 'newuser' && req.params.get('password') === 'pass123'
      );
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });

  describe('login', () => {
    it('should store user in localStorage and update signal on successful login', () => {
      const credentials: LoginCredentials = { username: 'testuser', password: 'pass123' };
      const response = { id: '123', username: 'testuser' };

      service.login(credentials).subscribe();

      const req = httpMock.expectOne(
        req => req.url === `${API_URL}/login` && req.params.get('username') === 'testuser' && req.params.get('password') === 'pass123'
      );
      req.flush(response);

      expect(service.currentUser()).toEqual({ id: '123', username: 'testuser' });
      expect(service.isAuthenticated()).toBeTruthy();
      expect(JSON.parse(localStorage.getItem('currentUser')!)).toEqual(response);
    });
  });

  describe('logout', () => {
    it('should remove user from localStorage and clear signal', () => {
      const user: CurrentUser = { id: '123', username: 'testuser' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      service['currentUserSignal'].set(user);

      service.logout();

      expect(service.currentUser()).toBeNull();
      expect(service.isAuthenticated()).toBeFalsy();
      expect(localStorage.getItem('currentUser')).toBeNull();
    });
  });
});
