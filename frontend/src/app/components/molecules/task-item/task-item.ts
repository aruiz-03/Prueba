import { Component, input, output } from '@angular/core';
import { Task } from '../../../models/task.model';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="task-item" [class.completed]="task().completed">
      <div class="task-content">
        <button class="checkbox" (click)="toggle.emit(task().id)">
          @if (task().completed) {
            <span class="check">✓</span>
          }
        </button>
        <div class="task-text">
          <span class="title">{{ task().title }}</span>
          @if (task().description) {
            <span class="description">{{ task().description }}</span>
          }
        </div>
      </div>
      <app-button variant="danger" size="small" (click)="delete.emit(task().id)">
        <span>✕</span>
      </app-button>
    </div>
  `,
  styles: [`
    .task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
      background: var(--surface);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      transition: all 0.2s ease;
    }
    .task-item:hover {
      box-shadow: var(--shadow);
    }
    .task-item.completed .title {
      text-decoration: line-through;
      color: var(--text-secondary);
    }
    .task-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    .checkbox {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid var(--border);
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .checkbox:hover {
      border-color: var(--primary);
    }
    .completed .checkbox {
      background: var(--success);
      border-color: var(--success);
    }
    .check {
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
    .task-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .title {
      font-size: 15px;
      color: var(--text-primary);
      transition: all 0.2s ease;
    }
    .description {
      font-size: 13px;
      color: var(--text-secondary);
    }
  `]
})
export class TaskItemComponent {
  task = input.required<Task>();
  toggle = output<string>();
  delete = output<string>();
}
