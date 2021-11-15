import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeLoadingComponent } from './cube-loading.component';

describe('CubeLoadingComponent', () => {
  let component: CubeLoadingComponent;
  let fixture: ComponentFixture<CubeLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubeLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
