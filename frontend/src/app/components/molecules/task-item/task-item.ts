import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox';
import { ButtonComponent } from '../../atoms/button/button';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CheckboxComponent, ButtonComponent, DatePipe],
  template: `
    <div class="task-item" [class.completed]="task().completed">
      <app-checkbox
        [checked]="task().completed"
        (checkedChange)="onToggle()"
      />
      <div class="task-content">
        <span class="task-title">{{ task().title }}</span>
        <span class="task-date">{{ task().createdAt | date:'shortDate' }}</span>
      </div>
      <app-button variant="danger" (click)="onDelete()">Eliminar</app-button>
    </div>
  `,
  styles: [`
    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: 12px;
      transition: all 0.2s ease;
      box-shadow: var(--shadow);
    }
    .task-item:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-1px);
    }
    .task-item.completed {
      opacity: 0.7;
    }
    .task-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .task-title {
      font-size: 15px;
      font-weight: 500;
      color: var(--text-primary);
    }
    .task-date {
      font-size: 12px;
      color: var(--text-secondary);
    }
    .completed .task-title {
      text-decoration: line-through;
      color: var(--text-secondary);
    }
  `]
})
export class TaskItemComponent {
  task = input.required<Task>();
  toggle = output<string>();
  delete = output<string>();

  onToggle(): void {
    this.toggle.emit(this.task().id);
  }

  onDelete(): void {
    this.delete.emit(this.task().id);
  }
}
