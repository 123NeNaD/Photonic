import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryRowComponent } from './gallery-row.component';

describe('GalleryRowComponent', () => {
  let component: GalleryRowComponent;
  let fixture: ComponentFixture<GalleryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
