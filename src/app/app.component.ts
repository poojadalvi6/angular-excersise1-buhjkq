import { Component } from '@angular/core';
import { CountService } from './count.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'uxtrendz';

  userCount: number;
  adminCount: number;

  constructor(private _countService: CountService) {
    this._countService.userCount.subscribe(res => {
      this.userCount = res;
    });
    this._countService.adminCount.subscribe(res => {
      this.adminCount = res;
    });
  }

  // for Users
  users = [];
  pushUsers(data) {
    this.users.push(data);
  }
  onRemoveUsers(item) {
    this.users.splice(item, 1);
    this.userCount = this.userCount - 1;
    this._countService.userCount.next(this.userCount);
  }

  // for Admins
  admins = [];
  pushAdmins(data) {
    this.admins.push(data);
  }
  onRemoveAdmins(item) {
    this.admins.splice(item, 1);
    this.adminCount = this.adminCount - 1;
    this._countService.adminCount.next(this.adminCount);
  }
}
