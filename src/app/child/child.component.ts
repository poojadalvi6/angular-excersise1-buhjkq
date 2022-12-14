import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CountService } from '../count.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() boxColor;
  @Input() placeholderText;

  @Output() inputEvent = new EventEmitter();

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

  get count() {
    if (this.placeholderText === 'Create User') {
      return this.userCount;
    } else {
      return this.adminCount;
    }
  }

  ngOnInit() {}

  onCreate(inpVal) {
    if (inpVal.value.length > 0) {
      if (this.placeholderText === 'Create User') {
        this.userCount = this.userCount + 1;
        this._countService.userCount.next(this.userCount);
      } else {
        this.adminCount = this.adminCount + 1;
        this._countService.adminCount.next(this.adminCount);
      }
      // alert(inpVal.value)
      this.inputEvent.emit(inpVal.value);
    }
  }
}
