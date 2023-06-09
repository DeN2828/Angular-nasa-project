import { Component } from '@angular/core';
import { SharedService } from './shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routing-app';
  isAuthorized: boolean = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuthorization();
      }
    });

    this.checkAuthorization();
  }

  checkAuthorization() {
    this.sharedService.access$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((access) => {
      this.isAuthorized = access;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAuthorizationChange(authorized: boolean) {
    this.sharedService.access = authorized;
  }
}
