import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponentMySqlComponent } from './register-form-component-my-sql.component';

describe('RegisterFormComponentMySqlComponent', () => {
  let component: RegisterFormComponentMySqlComponent;
  let fixture: ComponentFixture<RegisterFormComponentMySqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponentMySqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponentMySqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
