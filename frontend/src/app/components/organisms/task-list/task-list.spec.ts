import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list';
import { Task } from '../../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', completed: false, createdAt: new Date() },
    { id: '2', title: 'Task 2', completed: true, createdAt: new Date() }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tasks', mockTasks);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task items when tasks exist', () => {
    const taskItems = fixture.nativeElement.querySelectorAll('app-task-item');
    expect(taskItems.length).toBe(2);
  });

  it('should show empty state when no tasks', () => {
    fixture.componentRef.setInput('tasks', []);
    fixture.detectChanges();
    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should emit toggle when task toggle event is received', () => {
    const toggleSpy = jest.spyOn(component.toggle, 'emit');
    const taskItem = fixture.nativeElement.querySelector('app-task-item');
    taskItem.dispatchEvent(new CustomEvent('toggle', { detail: '1' }));
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should emit delete when task delete event is received', () => {
    const deleteSpy = jest.spyOn(component.delete, 'emit');
    const taskItem = fixture.nativeElement.querySelector('app-task-item');
    taskItem.dispatchEvent(new CustomEvent('delete', { detail: '1' }));
    expect(deleteSpy).toHaveBeenCalled();
  });
});
