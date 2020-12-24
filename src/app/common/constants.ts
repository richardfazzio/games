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
    NOT_FOUND: 'Oops! Game Not Found!'
}

// Paths for all valid games
export const GAME_ROUTES = {
    MEMORY: {
        path: ['memory'],
        modal: {
            title: 'Memory',
            body: `
                apple
            `
        },
        cardTitle: 'Memory',
        cardBody: 'Challenge yourself with a game of Memory!'
    }
}

export const GAME_RULES = {

}

