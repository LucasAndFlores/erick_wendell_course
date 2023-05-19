import { NotificationContext } from "./notificationContext.js";

export class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super();
    this.name = name;
    this.age = age;
  }

  isValid() {
    if (this.age < 20) {
      this.addNotification("Age must be higher than 20!");
    }

    if (this.name?.length < 4) {
      this.addNotification("Name should have more than 4 carachters");
    }

    return !this.hasNotification();
  }
}
