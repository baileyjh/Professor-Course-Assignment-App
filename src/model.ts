export interface Professor{
    id: string;
    professor: string;
    first: string;
    last: string;
    isDone: boolean;
    course: boolean
    credits: string;
}

export interface Course{
    id: number;
    course: string;
    isDone: boolean;
    credit: string;
    term: string;
    sub: string;
    num: string;
    sec: string;
}