import { Component, OnInit } from '@angular/core';
import { ROUTES } from 'src/app/common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  ROUTES = ROUTES;
  constructor() { }

  ngOnInit(): void {
  }

}
