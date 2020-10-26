import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullimageComponent } from './fullimage.component';

describe('FullimageComponent', () => {
  let component: FullimageComponent;
  let fixture: ComponentFixture<FullimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
