import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MEMORY_CARDS } from '../../utility/constants';
import { MemoryCard } from '../../utility/interfaces';


@Component({
    selector: 'app-memory-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.less']
})

export class CardComponent {
    @Input() card: MemoryCard;
    @Output() selected = new EventEmitter();
    CARD_TYPES = MEMORY_CARDS;

    cardSelected() {
        // If card is already guessed correctly don't emit click event
        if (this.card.guessedCorrectly) {
            return;
        }
        this.selected.emit(null);
    }
}