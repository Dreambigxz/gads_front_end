import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  imports: [
    CommonModule
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

  showMessageModal = false;
  messageModal = '';
  messageModalStatus: 'success' | 'info' | 'error' = 'info';
  messageModalTitle = 'Notice';

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.messageService.message$.subscribe(data => {

      this.messageModal = data.message;
      this.messageModalStatus = data.status;

      this.messageModalTitle =
        data.title ||
        (
          data.status === 'success'
            ? 'Success'
            : data.status === 'error'
              ? 'Something went wrong'
              : 'Notice'
        );

      this.showMessageModal = true;
    });
  }

  closeMessageModal() {
    this.showMessageModal = false;
  }

}
