import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RequestDataService } from './request-data.service';
import { QuickMessageService } from '../modals/quick-message/quick-message.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class FormHandlerService {
  private api = inject(RequestDataService);
  private toast = inject(QuickMessageService);

  submitForm(form: FormGroup,processor:any,endpoint: string, showToast=false, callback?: (res: any) => void): void {
    if (form.valid) {
      const data = form.value
      data['processor']=processor
      this.api.post(endpoint, data)
        .pipe(
          tap((res:any) => {
            // showToast?this.toast.show(res.message,res.status):0;
            callback?callback(res):0;
          }),
          catchError((err) => {
            // this.toast.show("Error timeout! please try again.")
            return of(null);
          })
        )
        .subscribe();
    } else {
      form.markAllAsTouched();
      showToast?this.toast.show('Please fix form errors before submitting.', 'error'):0;
    }
  }
}
