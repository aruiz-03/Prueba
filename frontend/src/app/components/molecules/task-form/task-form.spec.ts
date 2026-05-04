import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonComponent } from '../../atoms/button/button';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, InputFieldComponent, ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit taskAdded when addTask is called with valid title', () => {
    const taskAddedSpy = jest.spyOn(component.taskAdded, 'emit');
    component.title.set('New Task');
    component.addTask();
    expect(taskAddedSpy).toHaveBeenCalledWith({ title: 'New Task', description: '' });
    expect(component.title()).toBe('');
  });

  it('should not emit taskAdded when title is empty', () => {
    const taskAddedSpy = jest.spyOn(component.taskAdded, 'emit');
    component.title.set('   ');
    component.addTask();
    expect(taskAddedSpy).not.toHaveBeenCalled();
  });

  it('should update title on input change', () => {
    component.onTitleChange('Test Task');
    expect(component.title()).toBe('Test Task');
  });

  it('should clear title after adding task', () => {
    component.title.set('Test Task');
    component.addTask();
    expect(component.title()).toBe('');
  });
});
