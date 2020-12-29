import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from '../modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RulesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    RulesComponent,
    NgbModule,
    FormsModule
  ]
})
export class SharedModule { }
