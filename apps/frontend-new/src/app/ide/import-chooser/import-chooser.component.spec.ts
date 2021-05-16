import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportChooserComponent } from './import-chooser.component';

describe('ImportChooserComponent', () => {
  let component: ImportChooserComponent;
  let fixture: ComponentFixture<ImportChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
