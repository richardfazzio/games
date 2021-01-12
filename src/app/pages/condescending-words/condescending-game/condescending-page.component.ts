import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { QuoteModalComponent } from './modals/quote-modal/quote-modal.component';
import { WordsService } from './services/words.service';
import { GAME_TICK } from './utils/constants';

@Component({
  selector: 'app-condescending-page',
  templateUrl: './condescending-page.component.html',
  styleUrls: ['./condescending-page.component.less']
})
export class CondescendingPageComponent implements OnInit, OnDestroy {

  words = [];
  userText = '';
  score = 0;
  lives = 3;
  userInput = new FormControl();
  inputChange: Subject<string> = new Subject<string>();
  inputSubscription: Subscription;

  constructor(private wordsService: WordsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.wordsService.updateGameSubject.subscribe(data => {
      if (data.wordsGuessed){
        this.userText = '';
      }
      this.words = data.line.words;
      this.score = data.score;
      this.lives = data.lives;

      if (data.roundOver) {
        const modalRef = this.modalService.open(QuoteModalComponent, {
          keyboard: true,
          centered: true
        });
        modalRef.componentInstance.author = data.line.author;
        modalRef.componentInstance.quote = data.line.quote;
      }
    });

    this.inputSubscription = this.inputChange
      .pipe(
        debounceTime(GAME_TICK),
        distinctUntilChanged()
      )
      .subscribe(word => {
        this.wordsService.guessWord(word);
      });

  }

  ngOnDestroy(): void {
    this.wordsService.updateGameSubject.unsubscribe();
    this.inputSubscription.unsubscribe();
  }

  inputChanged(text: string): void {
    this.inputChange.next(text);
  }

  startGame(): void {
    this.wordsService.startGame();
  }
}
