import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantsAndScancodesComponent } from './constants-and-scancodes.component';

describe('ConstantsAndScancodesComponent', () => {
  let component: ConstantsAndScancodesComponent;
  let fixture: ComponentFixture<ConstantsAndScancodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstantsAndScancodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantsAndScancodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
