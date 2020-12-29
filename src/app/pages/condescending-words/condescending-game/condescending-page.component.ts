import { Component, OnDestroy, OnInit } from '@angular/core';
import { WordsService } from './utils/words.service';

@Component({
  selector: 'app-condescending-page',
  templateUrl: './condescending-page.component.html',
  styleUrls: ['./condescending-page.component.less']
})
export class CondescendingPageComponent implements OnInit, OnDestroy {

  words = [];
  userText = '';

  constructor(private wordsService: WordsService) { }

  ngOnInit(): void {
    this.wordsService.startGame();

    this.wordsService.updateGameSubject.subscribe(data => {
      console.log(data);
      
      this.words = data.line.words;
    });

  }

  ngOnDestroy(): void {
    this.wordsService.updateGameSubject.unsubscribe();
  }
}
