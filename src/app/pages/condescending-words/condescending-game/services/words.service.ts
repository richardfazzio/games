import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MAX_GAME_HEIGHT, MAX_GAME_WIDTH, STARTING_GAME_HEIGHT, WORDS_API_URL, GAME_START_DELAY, GAME_TICK, PUNCTUATION } from '../utils/constants';
import { Line, Word, QuoteApiResult, GameUpdate } from '../utils/interfaces';


@Injectable({
  providedIn: 'root'
})
export class WordsService {
  soemtext: any;
  updateGameSubject = new Subject<GameUpdate>();
  bagOfWords = [];
  currentLine: Line = null;
  gameInterval = null;
  currentRound = 0; // Start current round, starts from 0 for logic to increase spead
  score = 0;
  lives = 3;
  gameRunning = false;

  constructor(private http: HttpClient) { }

  async startGame(): Promise<void> {
    await this.getBagOfWords();
    this.bagOfWords = this.bagOfWords.slice(0, 500).sort(() => Math.random() > 0.5 ? -1 : 1).shift();
    this.gameRunning = true;
    setTimeout(() => this.runGame(), GAME_START_DELAY);
  }

  runGame(): void {
    this.currentLine = this.bagOfWords.shift();
    this.updateGameSubject.next({
      line: this.currentLine,
      score: this.score,
      lives: this.lives
    });
    setTimeout(() => this.startRound(), GAME_START_DELAY);
  }

  getBagOfWords(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get(WORDS_API_URL).subscribe((res: QuoteApiResult[]) => {
        this.bagOfWords = res.map(quote => {
          const words = quote.text.split(' ').map(w => {
            const x = Math.ceil(Math.random() * MAX_GAME_WIDTH);
            const y = Math.ceil(Math.random() * STARTING_GAME_HEIGHT);  // Word starts off screen
            const speed = Math.ceil(Math.random() * 8) + 3 + this.currentRound * 0.2;
            const word: Word = {
              text: w.replace(PUNCTUATION, ''), // Remove punctuation
              x,
              y,
              speed
            };
            return word;
          });
          const line: Line = {
            author: quote.author,
            quote: quote.text,
            words
          };
          return line;
        });
        resolve(null);
      });
    });
  }

  startRound(): void {
    this.gameInterval = setInterval(() => {
      this.currentLine.words.forEach((word: Word) => word.y += word.speed);
      if (this.currentLine.words.some((word: Word) => word.y > MAX_GAME_HEIGHT)) {
        this.lives--;
        this.currentLine.words = this.currentLine.words.filter((word: Word) => word.y < MAX_GAME_HEIGHT);
      }
      // Update data, default
      const update = {
        line: this.currentLine,
        score: this.score,
        lives: this.lives
      };
      // Game is over clear interval and update
      if (this.lives < 1) {
        clearInterval(this.gameInterval);
        this.updateGameSubject.next({
          ...update,
          roundOver: true
        });
        return;
      }
      // Game continues -> update
      this.updateGameSubject.next(update);
    }, GAME_TICK);
    this.currentRound += 1;
  }

  guessWord(text: string): void {
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
          score: this.score,
          lives: this.lives
        });
      } else {
        alert('Round Won');
        // this.updateGameSubject.next();
        this.updateGameSubject.next({
          line: this.currentLine,
          wordsGuessed: true,
          score: this.score,
          lives: this.lives,
          roundOver: true
        });
      }
    }
  }
}
