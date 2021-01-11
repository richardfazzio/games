import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WordsService } from './services/words.service';

@Component({
  selector: 'app-condescending-page',
  templateUrl: './condescending-page.component.html',
  styleUrls: ['./condescending-page.component.less']
})
export class CondescendingPageComponent implements OnInit, OnDestroy {

  words = [];
  userText = '';
  score = 0;
  userInput = new FormControl();
  inputChange: Subject<string> = new Subject<string>();
  inputSubscription: Subscription;

  constructor(private wordsService: WordsService) { }

  ngOnInit(): void {
    this.wordsService.startGame();

    this.wordsService.updateGameSubject.subscribe(data => {
      this.words = data.line.words;
      this.score = data.score || this.score;
      if (!!data.wordsGuessed){
        this.userText = '';
      }
    });

    this.inputSubscription = this.inputChange
      .pipe(
        debounceTime(100),
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
}
