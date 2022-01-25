import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsCodeComponent } from './lets-code.component';

describe('IdeComponent', () => {
  let component: LetsCodeComponent;
  let fixture: ComponentFixture<LetsCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [LetsCodeComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
