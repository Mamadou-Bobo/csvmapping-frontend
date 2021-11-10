import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetDefaultPasswordComponent } from './reset-default-password.component';

describe('ResetDefaultPasswordComponent', () => {
  let component: ResetDefaultPasswordComponent;
  let fixture: ComponentFixture<ResetDefaultPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetDefaultPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetDefaultPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
