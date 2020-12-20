import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MAX_BOARD_SIZE, MEMORY_CARDS } from './constants';
import { MemoryCard } from './interfaces';

// Memory
// Do not provide in root because this service is only needed in the memory module
@Injectable()
export class MemoryService {
    private _board = []
    SIZE_OF_BOARD: number;
    gameSubsription = new Subject<any>();

    constructor() {
        this.SIZE_OF_BOARD = MAX_BOARD_SIZE;
        this.resetBoard();
        this.gameSubsription.next(this._board);
    }

    // Returns an array of Memory Cards randomly assigning slots
    initCards(): MemoryCard[] {
        let types = Object.keys(MEMORY_CARDS);
        // Duplicate the keys and randomly place them in array
        types = [...types, ...types].sort(() => Math.random() > 0.5 ? 1 : -1);
        return types.map(this.createMemoryCard);
    }

    // Resets board state
    resetBoard(): void {
        this._board = [];
        const cards = this.initCards();
        for (let i = 0; i < this.SIZE_OF_BOARD; i++) {
            const row = [];
            for (let j = 0; j < this.SIZE_OF_BOARD; j++) {
                row.push(cards.shift());
            }
            this._board.push(row);
        }
    }

    // Card selected during game
    // Update Board and track logic for guess
    // Input: row and column for the board matrix
    cardSelected(row: number, column: number): void {
        this._board[row][column] = {
            ...this._board[row][column],
            selected: true
        }
        this.gameSubsription.next(this._board);
    }

    get board() {
        return this._board;
    }

    private createMemoryCard(type: string): MemoryCard {
        const card: MemoryCard = {
            type: type,
            selected: false,
            guessedCorrectly: false
        }
        return card;
    }
}