import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MAX_GAME_HEIGHT, MAX_GAME_WIDTH, STARTING_GAME_HEIGHT, WORDS_API_URL, GAME_START_DELAY } from '../utils/constants';
import { Line, Word } from '../utils/interfaces';


@Injectable({
  providedIn: 'root'
})
export class WordsService {
  soemtext: any;
  updateGameSubject = new Subject<any>();
  bagOfWords = [];
  currentLine: Line = null;
  gameInterval = null;
  currentRound = 0; // Start current round, starts from 0 for logic to increase spead
  score = 0;

  constructor(private http: HttpClient) { }

  async startGame(): Promise<void> {
    await this.getBagOfWords();
    this.currentLine = this.bagOfWords.slice(0, 10).sort((a, b) => Math.random() > 0.5 ? -1 : 1).shift();

    this.updateGameSubject.next({
      line: this.currentLine,
      score: this.score
    });
    setTimeout(() => {
      this.runGame();
    }, GAME_START_DELAY);
  }

  getBagOfWords(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get(WORDS_API_URL).subscribe((res: {
        text: string;
        author?: string;
      }[]) => {
        this.bagOfWords = res.map(quote => {
          const words = quote.text.split(' ').map(word => {
            const x = Math.ceil(Math.random() * MAX_GAME_WIDTH);
            const y = Math.ceil(Math.random() * STARTING_GAME_HEIGHT);  // Word starts off screen
            const speed = Math.ceil(Math.random() * 8) + 3 + this.currentRound * 0.2;
            return {
              text: word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''), // Remove punctuation
              x,
              y,
              speed
            }
          });
          return {
            author: quote.author,
            quote: quote.text,
            words
          }
        });
        console.log('middle')
        resolve(null);
      });
    });
  }

  runGame(): void {
    this.gameInterval = setInterval(() => {
      console.log('Interval', this.currentLine);
      this.currentLine.words.forEach((word: Word) => word.y += word.speed);
      if (this.currentLine.words.every((word: Word) => word.y > MAX_GAME_HEIGHT)) {
        clearInterval(this.gameInterval);
        alert('GAME OVER');
        return;
      }
      this.updateGameSubject.next({
        line: this.currentLine
      });
    }, 100);
    this.currentRound += 1;
  }

  guessWord(text: string): void {
    debugger;
    let typedCorrectly = false;
    this.currentLine.words = this.currentLine.words.filter(word => {
      if (word.text !== text) {
        return true;
      }
      typedCorrectly = true;
      return false;
    });

    if (typedCorrectly) {
      // User typed correctly
      this.score++;
      if (!!this.currentLine.words.length) {
        this.updateGameSubject.next({
          line: this.currentLine,
          wordsGuessed: true,
          score: this.score
        });
      } else {
        alert('Round Won');
      }
    }
  }
}
