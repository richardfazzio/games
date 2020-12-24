import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MemoryCard } from '../utility/interfaces';
import { MemoryService } from '../utility/memory.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit, OnDestroy {
    board: MemoryCard[][];
    gameStarted = false;
    currentPlayer: string;
    gameSubsription: Subscription = null;

    constructor(private memoryService: MemoryService) { }

    ngOnInit() {
        this.gameSubsription = this.memoryService.gameSubsription.subscribe(board => {
            this.board = board;
        });
        this.board = this.memoryService.board;
    }

    ngOnDestroy() {
        this.gameSubsription.unsubscribe();
    }

    cardSelected(row: number, column: number) {
        this.memoryService.cardSelected(row, column);
    }

    isDarkBackground(i, j) {
        if (i % 2 === 0) {
            return j % 2 === 0;
        }
        return j % 2 !== 0;
    }
}