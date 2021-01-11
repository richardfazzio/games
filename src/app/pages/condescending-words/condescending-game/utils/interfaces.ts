export interface Word {
    text: string;
    x: number; // X Location on the board
    y: number; // Y location on the board
    speed: number; // speed at which it the word falls
}

export interface Line {
    author?: string;
    quote: string;
    words: Word[];
}