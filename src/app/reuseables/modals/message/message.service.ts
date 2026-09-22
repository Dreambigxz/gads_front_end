import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface MessageData {
  message: string;
  status: 'success' | 'info' | 'error';
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSubject = new Subject<MessageData>();

  message$ = this.messageSubject.asObservable();

  show(
    message: string,
    status: 'success' | 'info' | 'error' = 'info',
    title?: string
  ) {
    this.messageSubject.next({
      message,
      status,
      title
    });
  }

  success(message: string, title = 'Success') {
    this.show(message, 'success', title);
  }

  info(message: string, title = 'Notice') {
    this.show(message, 'info', title);
  }

  error(message: string, title = 'Something went wrong') {
    this.show(message, 'error', title);
  }
}
