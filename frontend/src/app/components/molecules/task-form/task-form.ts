import { Component, signal, output } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [InputFieldComponent, ButtonComponent],
  template: `
    <div class="task-form">
      <app-input-field
        placeholder="¿Qué necesitas hacer?"
        [value]="title()"
        (valueChange)="onTitleChange($event)"
        (enterPress)="addTask()"
      />
      <app-button variant="primary" (click)="addTask()">
        <span>+ Agregar</span>
      </app-button>
    </div>
  `,
  styles: [`
    .task-form {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    @media (max-width: 640px) {
      .task-form {
        flex-direction: column;
      }
    }
  `]
})
export class TaskFormComponent {
  title = signal('');
  taskAdded = output<string>();

  onTitleChange(value: string): void {
    this.title.set(value);
  }

  addTask(): void {
    const trimmed = this.title().trim();
    if (trimmed) {
      this.taskAdded.emit(trimmed);
      this.title.set('');
    }
  }
}
