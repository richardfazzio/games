import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WORDS_API_URL } from './constants';
import { Word } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class WordsService {
  soemtext: any;
  updateGameSubject = new Subject<any>();
  bagOfWords = [];
  currentLine: Word = null;

  constructor(private http: HttpClient) { }

  async startGame() {
    console.log('begin')
    await this.getBagOfWords();
    console.log('end')

    this.updateGameSubject.next({
      line: this.bagOfWords.slice(0, 10).sort((a, b) => Math.random() > 0.5 ? -1 : 1).shift()
    });
  }

  getBagOfWords() {
    return new Promise((resolve, reject) => {
      this.http.get(WORDS_API_URL).subscribe((res: {
        text: string;
        author?: string;
      }[]) => {
        this.bagOfWords = res.map(quote => {
          const words = quote.text.split(' ').map(word => {
            return {
              text: word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''), // Remove puncatio
              x: Math.random() * 672,
              y: Math.random() * -50 // Word starts off screen
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
}
