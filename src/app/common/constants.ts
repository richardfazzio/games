import { INITIAL_NUMBER_OF_GUESSES } from '../pages/memory/memory-game/utility/constants';
import { PageRoute } from './interfaces';

export const HOME_PATH: PageRoute = {
    path: [''],
    type: 'HOME_PATH'
}

export const NOT_FOUND_PATH: PageRoute = {
    path: ['notFound'],
    type: 'NOT_FOUND_PATH'
}

// Header titles correspond to each page, used in routing data
export const HEADER_TITLES = {
    HOME: 'Play Fun Classic Games!',
    MEMORY: 'Memory Game',
    CONDESCENDING_WORDS: 'Condescending Words!',
    NOT_FOUND: 'Oops! Game Not Found!',
}

// Paths for all valid games
export const GAMES = {
    MEMORY: {
        path: ['memory'],
        modal: {
            title: 'Memory',
            body: `
                <h5>Rules:</h5>
                <p>There is 18 pairs of pictures, you will start with ${INITIAL_NUMBER_OF_GUESSES} guesses. Each time you find the correct pair, you will be awarded\n
                one extra guess. Find all of the pairs before you run out of guesses!</p>
            `
        },
        cardTitle: 'Memory',
        cardBody: 'Challenge yourself with a game of Memory!'
    },
    CONDESCENDING_WORDS: {
        path: ['condescending'],
        modal: {
            title: 'Condescending Words',
            body: `
                <h5>Rules:</h5>
                <p>There is 18 pairs of pictures, you will start with ${INITIAL_NUMBER_OF_GUESSES} guesses. Each time you find the correct pair, you will be awarded\n
                one extra guess. Find all of the pairs before you run out of guesses!</p>
            `
        },
        cardTitle: 'Condescending Words',
        cardBody: 'Don\'t let the words bring you down :) !!!'
    }
}
