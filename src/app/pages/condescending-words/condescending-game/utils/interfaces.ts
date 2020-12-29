export interface Word {
    text: string;
    author?: string;
    line: string[];
    x: number; // X Location on the board
    y: number; // Y location on the board
}