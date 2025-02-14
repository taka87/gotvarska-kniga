import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeMysqlComponent } from './recipe-mysql.component';

describe('RecipeMysqlComponent', () => {
  let component: RecipeMysqlComponent;
  let fixture: ComponentFixture<RecipeMysqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeMysqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeMysqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
