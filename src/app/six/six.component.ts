import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import {EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-six',
  templateUrl: './six.component.html',
  styleUrls: ['./six.component.css']
})
export class SixComponent {
  inputValue: string = '';
  isAuthorized: boolean = false;
  @Output() authorizationChange = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.isAuthorized = this.sharedService.access;
  }

  saveInput() {
    console.log(this.inputValue);

    if (this.inputValue && this.inputValue.length >= 40) {
      this.sharedService.key = this.inputValue;
      this.sharedService.access = true;
      this.isAuthorized = true;
      this.authorizationChange.emit(true);
      this.refreshNavigation();
    } else {
      this.sharedService.key = '';
      this.sharedService.access = false;
      this.isAuthorized = false;
      this.authorizationChange.emit(false);
    }
  }

  openRegistrationPage() {
    const url = 'https://api.nasa.gov';
    window.open(url, '_blank');
  }

  logout() {
    this.sharedService.key = '';
    this.sharedService.access = false;
    this.isAuthorized = false;
    this.authorizationChange.emit(false);
    this.refreshNavigation();
  }

  refreshNavigation() {
    const navigationEvent = new Event('NavigationEvent');
    const navElement = document.querySelector('nav');
    if (navElement) {
      navElement.dispatchEvent(navigationEvent);
    }
  }
}
