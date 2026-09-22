import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  visible = signal(false);

  title = signal('');

  message = signal('');

  confirmText = signal('Continue');

  cancelText = signal('Cancel');

  private callback: (() => void) | null = null;

  show(config: {

    title: string;

    message: string;

    confirmText?: string;

    cancelText?: string;

    onConfirm: () => void;

  }) {

    this.title.set(config.title);

    this.message.set(config.message);

    this.confirmText.set(config.confirmText ?? 'Continue');

    this.cancelText.set(config.cancelText ?? 'Cancel');

    this.callback = config.onConfirm;

    this.visible.set(true);


  }

  confirm() {

    this.visible.set(false);

    this.callback?.();

  }

  cancel() {

    this.visible.set(false);

  }

}
