import {
  Injectable,
  signal,
} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SuccessStatusService {

  readonly visible = signal(false);

  private hideTimer?: ReturnType<typeof setTimeout>;


  show(duration = 1800): void {
    clearTimeout(this.hideTimer);

    /*
     * Reset first so repeated actions restart the animation.
     */
    this.visible.set(false);

    requestAnimationFrame(() => {
      this.visible.set(true);

      this.hideTimer = setTimeout(() => {
        this.visible.set(false);
      }, duration);
    });
  }


  hide(): void {
    clearTimeout(this.hideTimer);
    this.visible.set(false);
  }
}
