import { PageRoute } from './interfaces';

export const HOME_PATH: PageRoute = {
    path: [''],
    value: 'Play Fun Classic Games!'
}

export const NOT_FOUND_PATH: PageRoute = {
    path: ['notFound'],
    value: 'Ooops! Game Not Found!'
}

export const HEADER_TITLES = {
    HOME: 'Play Fun Classic Games!',
    MEMORY: 'Memory Game',
    NOT_FOUND: 'Oops! Game Not Found!'
}

export const ROUTES: PageRoute[] = [
    {
        path: ['memory'],
        value: 'Memory Game'
    }
]

