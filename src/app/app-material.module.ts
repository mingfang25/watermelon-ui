import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule, MatListModule, MatSelectModule, MatDialogModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule, 
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatSnackBarModule,
      MatListModule,
      MatSelectModule,
      MatDialogModule,
      MatTooltipModule
    ],
  exports: [
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatSnackBarModule,
      MatListModule,
      MatSelectModule,
      MatDialogModule,
      MatTooltipModule
    ],
})
export class MaterialModule { }