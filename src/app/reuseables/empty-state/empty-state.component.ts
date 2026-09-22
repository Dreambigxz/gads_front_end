import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  imports: [
    CommonModule
  ],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.css'
})
export class EmptyStateComponent {

  icon = input('📭');

  title = input('No Data');

  message = input('Nothing to display.');

  buttonText = input('');

  action = output<void>();

  padding = input('');

}
