import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderService } from './loader.service';
import { Observable, of} from 'rxjs';

// <div class="spinner"></div>
// <div *ngIf="isLoading | async" class="spinner-overlay"> <div class="spinner"></div> </div>
@Component({
  selector: 'app-spinner',
  imports: [ CommonModule],

  template: `
    <div *ngIf="isLoading | async" class="spinner-overlay">

    <div class="se-pre-con" id="loader">
         <div class="loader">
             <div class="loader-inner ball-clip-rotate-multiple">
                 <div></div>
                 <div></div>
             </div>
         </div>
     </div>
    </div>
`,
styles: [`

    

  `]
})
export class SpinnerComponent {
    isLoading: Observable<boolean>;
   constructor(private loaderService: LoaderService) {
     this.isLoading = this.loaderService.loading$; // ✅ safe
   }

}
