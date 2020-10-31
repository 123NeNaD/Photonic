import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumRowComponent } from './album-row.component';

describe('AlbumRowComponent', () => {
  let component: AlbumRowComponent;
  let fixture: ComponentFixture<AlbumRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
