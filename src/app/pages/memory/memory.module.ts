import { NgModule } from '@angular/core';
import { MemoryComponent } from './memory-game/memory.component';
import { MemoryRoutingModule } from './memory-routing.module';
import { BoardComponent } from './memory-game/board/board.component';
import { CardComponent } from './memory-game/board/card/piece.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';



@NgModule({
  declarations: [MemoryComponent, BoardComponent, CardComponent],
  imports: [
    SharedModule,
    MemoryRoutingModule,
    FormsModule
  ],
  providers: []
})
export class MemoryModule { }
