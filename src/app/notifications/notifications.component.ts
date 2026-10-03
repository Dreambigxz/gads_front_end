import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentAgoPipe } from '../reuseables/pipes/moment.pipe';
import { QuickNavService } from '../reuseables/services/quick-nav.service'; // ✅ adjust path as needed
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-notifications',
  imports: [
    CommonModule,
    HeaderComponent,
    MomentAgoPipe
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  constructor(
    private quickNav: QuickNavService
  ){}

  activeTab: 'new' | 'read' = 'new';


  notifications: any = {

    unread: [],

    read: []

  };

  ngOnInit(){

    if (!this.quickNav.storeData.get("notifications")||!this.quickNav.storeData.get("notifications").seen) {
      this.quickNav.reqServerData.get("notifications/")
      .subscribe((res:any)=>{
        this.notifications = this.quickNav.storeData.get("notifications")//.unseen
      })
    }
  }


  /* =================================
     MARK AS READ
  ================================== */

  markAsRead(notification: any): void {


    /*
     * Find notification inside unread
     */

    const index =
      this.notifications.unseen.indexOf(notification);


    if (index === -1) {

      return;

    }


    /*
     * Remove from unread
     */

    this.notifications.unseen.splice(index, 1);


    /*
     * Add to read
     */

    this.notifications.seen.unshift(notification);


    /*
     * Switch to READ tab
     */

    this.activeTab = 'read';



    /*
     * If you have an API,
     * call it here.
     *
     * Example:
     *
     * this.notificationService
     *   .markAsRead(notification.id)
     *   .subscribe();
     */

  }


}
