import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalsComponent } from './medals.component';

describe('MedalsComponent', () => {
  let component: MedalsComponent;
  let fixture: ComponentFixture<MedalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
