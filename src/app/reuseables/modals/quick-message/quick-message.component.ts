import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickMessageService } from './quick-message.service';

@Component({
    selector: 'app-quick-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quick-message.component.html',
    styleUrls: ['./quick-message.component.css']
})
export class QuickMessageComponent {

    msg = inject(QuickMessageService);

}
