import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneTreeComponent } from './scene-tree.component';

describe('SceneTreeComponent', () => {
  let component: SceneTreeComponent;
  let fixture: ComponentFixture<SceneTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
