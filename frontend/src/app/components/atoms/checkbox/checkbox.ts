import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  template: `
    <label class="checkbox-wrapper">
      <input
        type="checkbox"
        [checked]="checked()"
        (change)="onChange()"
      />
      <span class="checkmark"></span>
    </label>
  `,
  styles: [`
    .checkbox-wrapper {
      display: inline-block;
      position: relative;
      cursor: pointer;
    }
    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  `]
})
export class CheckboxComponent {
  checked = input(false);
  checkedChange = output<boolean>();

  onChange(): void {
    this.checkedChange.emit(!this.checked());
  }
}
