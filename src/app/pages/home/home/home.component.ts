import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GAMES } from 'src/app/common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  games = GAMES;
  @ViewChild('rulesModal', { static: true }) rulesModal: ElementRef;
  constructor(private modalService: NgbModal) { }

  openRules(modal): void {
    const ref = this.modalService.open(this.rulesModal);
    ref.componentInstance.title = modal.title;
    ref.componentInstance.body = modal.body;
  }
}
