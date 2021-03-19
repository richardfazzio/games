import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quote-modal',
  templateUrl: './quote-modal.component.html',
  styleUrls: ['./quote-modal.component.less']
})
export class QuoteModalComponent implements OnInit {
  @Input() author: string;
  @Input() quote: string;
  @Input() roundWon: boolean;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    debugger;
  }
}
