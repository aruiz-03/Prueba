import { Component, input, output } from '@angular/core';
import { Task } from '../../../models/task.model';
import { TaskItemComponent } from '../../molecules/task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent],
  template: `
    @if (tasks().length > 0) {
      <div class="task-list">
        @for (task of tasks(); track task.id) {
          <app-task-item
            [task]="task"
            (toggle)="toggle.emit($event)"
            (delete)="delete.emit($event)"
          />
        }
      </div>
    } @else {
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <p class="empty-title">No hay tareas aún</p>
        <p class="empty-message">Agrega tu primera tarea usando el formulario de arriba</p>
      </div>
    }
  `,
  styles: [`
    .task-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .empty-state {
      text-align: center;
      padding: 48px 20px;
      background: var(--surface);
      border-radius: var(--radius-lg);
      border: 2px dashed var(--border);
    }
    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .empty-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    .empty-message {
      color: var(--text-secondary);
      font-size: 14px;
    }
  `]
})
export class TaskListComponent {
  tasks = input.required<Task[]>();
  toggle = output<string>();
  delete = output<string>();
}
