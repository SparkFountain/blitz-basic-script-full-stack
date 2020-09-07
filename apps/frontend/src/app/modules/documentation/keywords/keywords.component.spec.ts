import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsComponent } from './keywords.component';

describe('KeywordsComponent', () => {
  let component: KeywordsComponent;
  let fixture: ComponentFixture<KeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
