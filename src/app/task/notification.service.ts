import { Injectable } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {
  constructor(private localNotifications: LocalNotifications) {}

  createNotification() {
    this.localNotifications.requestPermission().then(granted => {
      this.localNotifications.schedule({
        title: 'My first notification',
        text: 'Thats pretty easy...',
        foreground: true
      });
    })
  }
}
