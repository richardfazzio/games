import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryComponent } from './memory-game/memory.component';
import { MemoryRoutingModule } from './memory-routing.module';
import { BoardComponent } from './memory-game/board/board.component';
import { MemoryService } from './memory-game/utility/memory.service';
import { CardComponent } from './memory-game/board/card/piece.component';



@NgModule({
  declarations: [MemoryComponent, BoardComponent, CardComponent],
  imports: [
    CommonModule,
    MemoryRoutingModule
  ],
  providers: [MemoryService]
})
export class MemoryModule { }
