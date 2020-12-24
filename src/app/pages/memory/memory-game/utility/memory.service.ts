import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CARD_DELAY, MAX_BOARD_SIZE, INITIAL_NUMBER_OF_GUESSES, MEMORY_CARDS, GAME_STATUS } from './constants';
import { GameState, MemoryCard } from './interfaces';

// Memory
// Do not provide in root because this service is only needed in the memory module
@Injectable({
    providedIn: 'root'
})
export class MemoryService {
    gameSubsription = new Subject<MemoryCard[][]>();
    gameStateSubject = new Subject<GameState>();
    
    private _board = []
    private SIZE_OF_BOARD = MAX_BOARD_SIZE;
    // For keeping track of game
    private gameOver = false;
    private wrongGuesses = 0;
    private correctGuuess = 0;
    private previousGuess = []; // [row, column] of last guess
    private processingGuess = false;
    numberOfGuesses = INITIAL_NUMBER_OF_GUESSES;

    constructor() {
        this.resetBoard();
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
        this.numberOfGuesses = INITIAL_NUMBER_OF_GUESSES; // Number of types of cards => the amount they need to guess
        this.gameOver = false;
        this.processingGuess = false;
        this.wrongGuesses = 0;
        this.correctGuuess = 0;
        this.previousGuess = [];
        this._board = [];
        const cards = this.initCards();
        for (let i = 0; i < this.SIZE_OF_BOARD; i++) {
            const row = [];
            for (let j = 0; j < this.SIZE_OF_BOARD; j++) {
                row.push(cards.shift());
            }
            this._board.push(row);
        }
        this.gameSubsription.next(this._board);
        this.gameStateSubject.next({
            state: GAME_STATUS.NOT_STARTED,
            won: false,
            guessesLeft: this.numberOfGuesses
        });
    }

    // Card selected during game
    // Update Board and track logic for guess
    // Input: row and column for the board matrix
    cardSelected(row: number, column: number): void {
        if (this.gameOver || this.processingGuess) {
            return;
        }

        // If they click the previous guess, return
        if (this.previousGuess[0] === row && this.previousGuess[1] === column) {
            return;
        }

        this.processingGuess = true;
        // If they click the same card, do no penalize them
        this.selectCardOnBoard(row, column, true);

        // If there is no previous guess update board and add to previous guess 
        if (!this.previousGuess.length) {
            this.previousGuess = [row, column];
            this.gameSubsription.next(this.board);
            setTimeout(() => {
                this.processingGuess = false;
            }, CARD_DELAY - 500);
        } else {
            const [i, j] = this.previousGuess; // i and j are indices of previous guess
            const card1 = this.board[i][j];
            const card2 = this.board[row][column];
            if (this.compareGuess(card1, card2)) {
                this.numberOfGuesses++;
                this.correctGuuess++;
                this.setCardsAsGuessedCorrectly(i, j, row, column);
                    if (this.correctGuuess >= this.numberOfGuesses) {
                    this.gameWon();
                }
                setTimeout(() => {
                    this.gameStateSubject.next({
                        guessesLeft: this.numberOfGuesses - this.wrongGuesses,
                        state: GAME_STATUS.GUESSED_CORRECT
                    });
                    this.processingGuess = false;
                }, CARD_DELAY);
            } else {
                // Incorrect guess
                // Unselect cards and increment wrong guess
                setTimeout(() => {
                    this.wrongGuesses++;
                    if (this.wrongGuesses >= this.numberOfGuesses) {
                        return this.gameLost()
                    }
                    this.unSelectCards(i, j, row, column)
                    this.gameStateSubject.next({
                        guessesLeft: this.numberOfGuesses - this.wrongGuesses,
                        state: GAME_STATUS.GUESSED_WRONG
                    });
                    this.processingGuess = false;
                }, CARD_DELAY * 2);

            }
            this.previousGuess = [];
        }
    }

    get board() {
        return this._board;
    }

    private compareGuess(card1: MemoryCard, card2: MemoryCard) {
        return card1.type === card2.type;
    }

    // Set the cards in the board to guessed correctly
    private setCardsAsGuessedCorrectly(row1: number, column1: number, row2: number, column2: number): void {
        this.board[row1][column1].guessedCorrectly = true;
        this.board[row2][column2].guessedCorrectly = true;
        this.gameSubsription.next(this.board);
    }

    // Set the cards in the board to guessed correctly
    private unSelectCards(row1: number, column1: number, row2: number, column2: number): void {
        this.selectCardOnBoard(row1, column1, false);
        this.selectCardOnBoard(row2, column2, false);
        this.gameSubsription.next(this.board);
    }

    private createMemoryCard(type: string): MemoryCard {
        const card: MemoryCard = {
            type: type,
            selected: false,
            guessedCorrectly: false,
            notGuessed: false
        }
        return card;
    }

    private selectCardOnBoard(row: number, column: number, value: boolean) {
        this.board[row][column] = {
            ...this.board[row][column],
            selected: value
        };
    }

    private gameWon(): void {
        console.log('GAME WON');
        this.gameOver = true;
        this.gameSubsription.next(this._board);
        this.gameStateSubject.next({
            state: GAME_STATUS.GAME_WON,
            won: true,
            guessesLeft: this.numberOfGuesses
        });
    }

    private gameLost(): void {
        console.log('GAME LOST');
        this.gameOver = true;
        this.revealCards();
        this.gameSubsription.next(this._board);
        this.gameStateSubject.next({
            state: GAME_STATUS.GAME_OVER,
            won: false,
            guessesLeft: 0
        });
    }

    private revealCards(): void {
        this._board.forEach(row => {
            row.forEach(elem => {
                if (!elem.guessedCorrectly) {
                    elem.notGuessed = true;
                    elem.selected = true;
                }
            });
        });
    }

}