import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-join',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css', '../auth.scss']
})
export class JoinComponent {

  @Input() authService!: any;

  maxChars = 6 


  ngOnInit(){

    if(!this.authService.country)this.authService.detectCountry();

  }


  get passwordControl(): AbstractControl | null {
    return this.authService.formView.register.get('password');
  }

  get confirmPasswordControl(): AbstractControl | null {
    return this.authService.formView.register.get('confirm_password');
  }

  get passwordValue(): string {
    return this.passwordControl?.value ?? '';
  }

  get hasMinimumLength(): boolean {
    return this.passwordValue.length >= this.maxChars;
  }

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.passwordValue);
  }

  get hasLowercase(): boolean {
    return /[a-z]/.test(this.passwordValue);
  }

  get hasNumber(): boolean {
    return /\d/.test(this.passwordValue);
  }

  get hasLetter(): boolean {

    return /[a-zA-Z]/.test(this.passwordValue);;
  }

  get hasSpecialCharacter(): boolean {
    return /[^A-Za-z0-9]/.test(this.passwordValue);
  }

  get passwordsMatch(): boolean {
    const password = this.passwordControl?.value;
    const confirmation = this.confirmPasswordControl?.value;

    return Boolean(
      password &&
      confirmation &&
      password === confirmation
    );
  }

  private passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const confirmation = form.get('confirm_password')?.value;

      return password === confirmation
        ? null
        : { passwordMismatch: true };
    };
  }

  // submit(): void {
  //   if (this.authService.formView.register.invalid) {
  //     this.authService.formView.register.markAllAsTouched();
  //     return;
  //   }
  //
  //   console.log(this.registerForm.value);
  // }


}
