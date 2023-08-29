import { Injectable } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {
  constructor(private localNotifications: LocalNotifications) {}

  createNotification() {
    this.localNotifications.schedule({
      title: 'My first notification',
      trigger: {at: new Date(new Date().getTime() + 1000)},
      text: 'Thats pretty easy...',
      foreground: true
    });
  }
}
