import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Enter text');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Enter text');
  });

  it('should emit valueChange on input', () => {
    const valueChangeSpy = jest.spyOn(component.valueChange, 'emit');
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    expect(valueChangeSpy).toHaveBeenCalledWith('test');
  });

  it('should emit enterPress on Enter keydown', () => {
    const enterPressSpy = jest.spyOn(component.enterPress, 'emit');
    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(enterPressSpy).toHaveBeenCalled();
  });

  it('should set input type', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('password');
  });
});
