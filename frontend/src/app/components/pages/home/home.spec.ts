import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAuthService: any;
  let mockTaskService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      currentUser: signal(null),
      logout: jest.fn()
    };
    mockTaskService = {
      tasks: signal([]),
      addTask: jest.fn(),
      toggleTask: jest.fn(),
      deleteTask: jest.fn()
    };
    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get taskService from inject', () => {
    expect(component.taskService).toBeDefined();
  });

  it('should get authService from inject', () => {
    expect(component.authService).toBeDefined();
  });

  it('should call authService.logout and navigate on logout', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display task count from taskService', () => {
    mockTaskService.tasks.set([{ id: '1', title: 'Task 1', completed: false, createdAt: new Date() }]);
    fixture.detectChanges();
    const taskCount = fixture.nativeElement.querySelector('.task-count');
    expect(taskCount.textContent).toContain('1 tareas');
  });
});
