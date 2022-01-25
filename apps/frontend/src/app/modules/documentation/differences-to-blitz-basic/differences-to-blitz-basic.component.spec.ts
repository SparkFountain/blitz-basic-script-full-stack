import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferencesToBlitzBasicComponent } from './differences-to-blitz-basic.component';

describe('DifferencesToBlitzBasicComponent', () => {
  let component: DifferencesToBlitzBasicComponent;
  let fixture: ComponentFixture<DifferencesToBlitzBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [DifferencesToBlitzBasicComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferencesToBlitzBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
