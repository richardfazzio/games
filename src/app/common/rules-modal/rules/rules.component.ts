import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rules-modal',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.less']
})
export class NgbdModalContent {
  @Input() title: string;
  @Input() body: string;
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-rules-modal-button',
  template: `<button href class="btn btn-dark" (click)="openRules()">Rules</button>`,
  styleUrls: ['./rules.component.less']
})
export class RulesComponent {
  @Input() title: string;
  @Input() body: string;
  constructor(private modalService: NgbModal) {}

  openRules() {
      const modalRef = this.modalService.open(NgbdModalContent, {
        windowClass: 'rules-modal',
        keyboard: true,
        centered: true
      });
      modalRef.componentInstance.title = this.title;
      modalRef.componentInstance.body = this.body;
  }
}