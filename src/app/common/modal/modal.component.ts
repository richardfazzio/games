import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class NgbdModalContent {
  @Input() title: string;
  @Input() body: string;
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-modal-button',
  template: `<button href class="btn btn-dark" (click)="openModal()">About</button>`,
  styleUrls: ['./modal.component.less']
})
export class RulesComponent {
  @Input() title: string;
  @Input() body: string;
  constructor(private modalService: NgbModal) {}

  openModal() {
      const modalRef = this.modalService.open(NgbdModalContent, {
        windowClass: 'info-modal',
        keyboard: true,
        centered: true
      });
      modalRef.componentInstance.title = this.title;
      modalRef.componentInstance.body = this.body;
  }
}