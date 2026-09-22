import { Component, Input } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chanage-password',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chanage-password.component.html',
  styleUrl: './chanage-password.component.css'
})
export class ChanagePasswordComponent {

  @Input() quickNav : any  // false;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  changingPassword = false;

  hasNumber = false;
  hasLetter = false;
  passwordsMatch = false;


  validatePassword() {

    this.hasNumber = /\d/.test(this.newPassword);

    this.hasLetter = /[a-zA-Z]/.test(this.newPassword);

    this.passwordsMatch =
      this.newPassword.length > 0 &&
      this.newPassword === this.confirmPassword;

  }


  get canChangePassword(): boolean {

    return (
      this.currentPassword.length > 0 &&
      this.newPassword.length >= 8 &&
      this.hasNumber &&
      this.hasLetter &&
      this.passwordsMatch &&
      this.newPassword !== this.currentPassword
    );

  }



  closeChangePassword() {

    if (this.changingPassword) {
      return;
    }

    // this.showChangePassword = false;

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';

    this.showCurrentPassword = false;
    this.showNewPassword = false;
    this.quickNav.changePassword = false

    this.validatePassword();

  }


  changePassword() {

    if (!this.canChangePassword) {
      return;
    }

    this.changingPassword = true;

    this.quickNav.reqServerData.post("change-password/", {'old-password':this.currentPassword, "new-password": this.newPassword})
    .subscribe((res:any)=>{

      this.changingPassword = false

      if (res.status==='success') {
        this.quickNav.authService.logout()
      }


    })



  }


}
