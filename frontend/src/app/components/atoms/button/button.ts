import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="variant()"
    >
      <ng-content />
    </button>
  `,
  styles: [`
    button {
      padding: 10px 20px;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    button:not(:disabled):hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    button:not(:disabled):active {
      transform: translateY(0);
    }
    .primary {
      background: var(--primary);
      color: white;
    }
    .primary:not(:disabled):hover {
      background: var(--primary-hover);
    }
    .danger {
      background: var(--danger);
      color: white;
    }
    .danger:not(:disabled):hover {
      background: var(--danger-hover);
    }
    .secondary {
      background: var(--secondary);
      color: white;
    }
    .secondary:not(:disabled):hover {
      background: var(--secondary-hover);
    }
  `]
})
export class ButtonComponent {
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
  variant = input<'primary' | 'danger' | 'secondary'>('primary');
}
