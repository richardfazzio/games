import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  titleText: string;
  private urlSubscription: Subscription;


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.urlSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => route.firstChild),
        switchMap(route => route.data),
        map(data => data.title))
      .subscribe(title => {
        this.titleText = title
      });

  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
  }
}
