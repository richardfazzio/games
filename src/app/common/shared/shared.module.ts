import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from '../rules-modal/rules/rules.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RulesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    RulesComponent,
    NgbModule
  ]
})
export class SharedModule { }
