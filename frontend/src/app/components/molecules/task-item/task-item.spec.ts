import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item';
import { Task } from '../../../models/task.model';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    completed: false,
    createdAt: new Date('2024-01-01')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title', () => {
    const titleElement = fixture.nativeElement.querySelector('.task-title');
    expect(titleElement.textContent).toContain('Test Task');
  });

  it('should emit toggle with task id when onToggle is called', () => {
    const toggleSpy = vi.spyOn(component.toggle, 'emit');
    component.onToggle();
    expect(toggleSpy).toHaveBeenCalledWith('1');
  });

  it('should emit delete with task id when onDelete is called', () => {
    const deleteSpy = vi.spyOn(component.delete, 'emit');
    component.onDelete();
    expect(deleteSpy).toHaveBeenCalledWith('1');
  });

  it('should apply completed class when task is completed', () => {
    fixture.componentRef.setInput('task', { ...mockTask, completed: true });
    fixture.detectChanges();
    const taskItem = fixture.nativeElement.querySelector('.task-item');
    expect(taskItem.classList.contains('completed')).toBe(true);
  });
});
