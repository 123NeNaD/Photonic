import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';
import { AlbumGridComponent } from './album-grid/album-grid.component';
import { AlbumRowComponent } from './album-row/album-row.component'
import { FullimageComponent } from './fullimage/fullimage.component';
import { GalleryRowComponent } from './gallery-row/gallery-row.component'
import { AuthGuard } from './auth.guard';


import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select'
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  { path: '', component: GalleryGridComponent, canActivate: [AuthGuard]},
  { path: 'galleryGrid', component: GalleryGridComponent, canActivate: [AuthGuard]},
  { path: 'galleryRow', component: GalleryRowComponent, canActivate: [AuthGuard]},
  { path: 'albumGrid/:id', component: AlbumGridComponent, canActivate: [AuthGuard]},
  { path: 'albumRow/:id', component: AlbumRowComponent, canActivate: [AuthGuard]},
  { path: 'fullImage/:id', component: FullimageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    GalleryGridComponent,
    GalleryRowComponent,
    FullimageComponent,
    AlbumGridComponent,
    AlbumRowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCardModule,
    DragDropModule,
    MatAutocompleteModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [
    AuthGuard
  ],
})
export class GalleryModule { }
