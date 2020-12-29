import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/common/shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
