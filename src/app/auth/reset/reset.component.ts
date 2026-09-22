import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-reset',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css', "../auth.scss"]
})
export class ResetComponent {

  @Input() authService!: any;

}
