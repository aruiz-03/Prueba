import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be checked by default', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.checked).toBe(false);
  });

  it('should reflect checked state', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.checked).toBe(true);
  });

  it('should emit checkedChange on change', () => {
    const checkedChangeSpy = vi.spyOn(component.checkedChange, 'emit');
    const input = fixture.nativeElement.querySelector('input');
    input.click();
    expect(checkedChangeSpy).toHaveBeenCalledWith(true);
  });
});
