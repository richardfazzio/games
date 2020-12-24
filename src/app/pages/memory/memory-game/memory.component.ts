import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GAMES } from 'src/app/common/constants';
import { GAME_STATUS, INITIAL_NUMBER_OF_GUESSES } from './utility/constants';
import { GameState } from './utility/interfaces';
import { MemoryService } from './utility/memory.service';



@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.less']
})
export class MemoryComponent implements OnInit, OnDestroy {
  @ViewChild('audioTag', { static: true }) audio: ElementRef 
  private gameStateSubscription: Subscription;
  private GAME_SOUNDS = {
    GUESSED_CORRECT: '../../../assets/guessed_correct.mp3',
    GUESSED_INCORRECT: '../../../assets/guessed_incorrect.mp3'
  }
  statusText: string;
  numberOfGuessesLeft = INITIAL_NUMBER_OF_GUESSES;
  games = GAMES;
  audioSrc = '';
  sound = true;

  constructor(private memoryService: MemoryService) { }

  ngOnInit(): void {
    this.gameStateSubscription = this.memoryService.gameStateSubject.subscribe((state: GameState) => {
      this.numberOfGuessesLeft = state.guessesLeft || this.numberOfGuessesLeft;
      this.statusText = state.state && this.getStatus(state.state) || this.statusText;
      // If guessed is truthy play sound
      if (this.sound && !!state.guessed) {
        // If guessed is 1 they guessed correctly, else the guess incorrectly
        this.audioSrc = state.guessed === 1 ? this.GAME_SOUNDS.GUESSED_CORRECT : this.GAME_SOUNDS.GUESSED_INCORRECT;
        this.playGuessedSound();
      }
    });
    this.statusText = this.getStatus(GAME_STATUS.NOT_STARTED);
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }

  playGuessedSound(): void {
    this.sound && this.audio.nativeElement.play();
  }

  resetBoard(): void {
    this.memoryService.resetBoard();
  }

  getStatus(state: string): string {
    switch (state) {
      case GAME_STATUS.NOT_STARTED:
        return `Good luck, the board is set! You have ${this.numberOfGuessesLeft} guesses!`;
      case GAME_STATUS.GAME_OVER:
        return 'Game is over... Better luck next time!';
      case GAME_STATUS.GAME_WON:
        return 'Good job you won!';
      case GAME_STATUS.GUESSED_CORRECT:
        return `Good job you got one, you get an extra guess, you have ${this.numberOfGuessesLeft} left!`;
      case GAME_STATUS.GUESSED_WRONG:
        return `Oof, you can get it next guess, you still have ${this.numberOfGuessesLeft} guesses left!`;
      default:
        return 'Good luck, the board is set!';
    }
  }

}
