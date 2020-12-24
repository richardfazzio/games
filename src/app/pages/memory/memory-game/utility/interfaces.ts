export interface MemoryCard {
    type: string;
    selected: boolean;
    guessedCorrectly: boolean;
    notGuessed?: boolean;
}

export interface GameState {
    state?: string;
    won?: boolean;
    guessesLeft?: number;
    guessed?: number; // 1 if correct, 2 if guessed wrong
}
