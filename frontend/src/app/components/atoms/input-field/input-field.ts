import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  template: `
    <input
      [type]="type()"
      [placeholder]="placeholder()"
      [value]="value()"
      (input)="onInput($event)"
      (keydown.enter)="onEnter()"
      class="input-field"
    />
  `,
  styles: [`
    .input-field {
      padding: 10px 16px;
      border: 2px solid var(--border);
      border-radius: var(--radius);
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      background: var(--surface);
      color: var(--text-primary);
    }
    .input-field:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    .input-field::placeholder {
      color: var(--text-secondary);
    }
  `]
})
export class InputFieldComponent {
  type = input<string>('text');
  placeholder = input<string>('');
  value = input<string>('');
  valueChange = output<string>();
  enterPress = output<void>();

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onEnter(): void {
    this.enterPress.emit();
  }
}
