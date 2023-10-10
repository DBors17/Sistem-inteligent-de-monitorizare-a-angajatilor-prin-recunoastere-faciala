import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceRComponent } from './face-r.component';

describe('FaceRComponent', () => {
  let component: FaceRComponent;
  let fixture: ComponentFixture<FaceRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
