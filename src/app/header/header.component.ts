import { Component } from '@angular/core';
import { HOME_PATH, ROUTES } from '../common/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  HOME_PATH = HOME_PATH;
  ROUTES = ROUTES;
}
