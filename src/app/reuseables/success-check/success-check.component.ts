import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import {
  SuccessStatusService,
} from './service';


@Component({
  selector: 'app-success-check',
  imports: [
    CommonModule
  ],
  templateUrl: './success-check.component.html',
  styleUrl: './success-check.component.scss'
})
export class SuccessCheckComponent {

  readonly statusService =
    inject(SuccessStatusService);


}
