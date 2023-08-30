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
        foreground: true,
        vibrate: true
      });
    });
    this.localNotifications.schedule({
      id: 2,
      title: 'Minha Notificação',
      text: 'Esta é uma notificação local!',
      trigger: { at: new Date(new Date().getTime() + 5000) }
    })
  }
}
