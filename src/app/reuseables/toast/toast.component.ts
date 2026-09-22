import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [
    CommonModule,
    MatIconModule

  ],
})
export class ToastComponent {


  message = ''
  type = 'info'
  duration = 7500;

  close!: () => void;


}
