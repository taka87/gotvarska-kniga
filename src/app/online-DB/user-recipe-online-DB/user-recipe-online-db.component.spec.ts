import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeMysqlComponent } from './user-recipe-online-db.component';

describe('UserRecipeMysqlComponent', () => {
  let component: UserRecipeMysqlComponent;
  let fixture: ComponentFixture<UserRecipeMysqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRecipeMysqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecipeMysqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
