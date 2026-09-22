import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {

  @Input() pendingTasks = 0;


}
