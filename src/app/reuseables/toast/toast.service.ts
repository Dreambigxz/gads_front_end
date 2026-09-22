import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { ToastComponent } from './toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {

  appRef = inject(ApplicationRef)
  injector = inject(EnvironmentInjector)

  show(data: any) {

    const componentRef = createComponent(
      ToastComponent,
      {
        environmentInjector: this.injector
      }
    )

    componentRef.instance.message =
      data.message

    componentRef.instance.type =
      data.status || 'info'

    /* PASS CLOSE FUNCTION */
    componentRef.instance.close = () => {

      this.appRef.detachView(
        componentRef.hostView
      )

      componentRef.destroy()
    }

    const duration =
      data.duration || 9500

      componentRef.instance.duration =
    duration;

    this.appRef.attachView(
      componentRef.hostView
    )

    const domElem =
      (componentRef.hostView as any)
        .rootNodes[0]

    document.body.appendChild(domElem)

    setTimeout(() => {

      if (!(componentRef.hostView as any).destroyed) {

        this.appRef.detachView(
          componentRef.hostView
        )

        componentRef.destroy()

      }

    }, duration)

  }

}
