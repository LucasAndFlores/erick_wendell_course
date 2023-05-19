export class NotificationContext {
  constructor() {
    this.notifications = [];
  }

  hasNotification() {
    return this.notifications.length;
  }

  addNotification(notification) {
    this.notifications.push(notification);
  }
}
