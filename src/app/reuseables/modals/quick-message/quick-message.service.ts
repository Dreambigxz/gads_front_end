import { Injectable, signal } from '@angular/core';

export type MessageType =
    | 'success'
    | 'error'
    | 'warning'
    | 'info';

@Injectable({
  providedIn: 'root'
})

export class QuickMessageService {

  visible = signal(false);

  text = signal('');

  type = signal<'success' | 'error' | 'warning' | 'info'>('info');

  timer: any;

  show(
      text: string,
      type: MessageType = 'info',
      duration = 5000
  ) {

      clearTimeout(this.timer);

      this.text.set(text);

      this.type.set(type);

      this.visible.set(true);

      this.timer = setTimeout(() => {

          this.visible.set(false);

      }, duration);

  }

}
