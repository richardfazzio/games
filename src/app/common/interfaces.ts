export interface RulesModal {
    title: string;
    body: string;
}

export interface PageRoute {
    path: string[];
    type: string;
    modal?:  RulesModal;
}
