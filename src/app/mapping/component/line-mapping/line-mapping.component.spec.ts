import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMappingComponent } from './line-mapping.component';

describe('LineMappingComponent', () => {
  let component: LineMappingComponent;
  let fixture: ComponentFixture<LineMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
