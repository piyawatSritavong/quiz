export interface IAnswer {
    id: string;
    options: string;
    correct?: boolean;
}

export interface IQuiz {
    id: string;
    question: string;
    answer: IAnswer[];
}

export interface IPaper {
    id: string;
    name: string;
    paper: IQuiz[];
    user?: string;
}
