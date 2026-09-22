import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { QuickNavService } from '../services/quick-nav.service'; // ✅ adjust path as needed

import {  Router } from '@angular/router';


@Component({
  selector: 'app-status-dialog',
  imports:[CommonModule,
    MatIconModule,MatButtonModule,MatDialogModule,
  ],
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    message: string;
    status: 'success' | 'error';
  },
  private router: Router,
  private quickNav: QuickNavService
  ) {}

  // constructor(private router: Router) {}

  reloadPage() {

    window.location.reload()
    console.log("reloading");
    // this.quickNav.reload('main')
   // const currentUrl = this.router.url;
   // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
   //   this.router.navigateByUrl(currentUrl);
   // });
  }

}
