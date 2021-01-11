import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondescendingPageComponent } from './condescending-game/condescending-page.component';
import { CondescendingRoutingModule } from './condescending-routing.module';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CondescendingPageComponent],
  imports: [
    SharedModule,
    CondescendingRoutingModule,
    FormsModule
  ]
})
export class CondescendingWordsModule { }
