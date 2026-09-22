import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Component({
    selector: 'app-confirmation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirmation-dialog.component.html',
    styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationComponent {

    confirm = inject(ConfirmationDialogService);

}
