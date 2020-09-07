import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyProjectComponent } from './empty-project.component';

describe('EmptyProjectComponent', () => {
  let component: EmptyProjectComponent;
  let fixture: ComponentFixture<EmptyProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
