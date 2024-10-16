export const PENDING: string = "Pending";
export const DONE: string = "Done";
export const WONT_DO: string = "Won't do";

export const PENDING_KEY: string = "pending";
export const DONE_KEY: string = "done";
export const WONT_DO_KEY: string = "wontdo";

const PUNCH: string = "#d62828";
const CASABLANCA: string = "#FCBF49";
const GLADE_GREEN: string = "#588157";

export const TODO_STATUS_MAP: Array<{
    name: string;
    color: string;
    key: string;
}> = [
    { name: PENDING, color: CASABLANCA, key: PENDING_KEY },
    { name: DONE, color: GLADE_GREEN, key: DONE_KEY },
    { name: WONT_DO, color: PUNCH, key: WONT_DO_KEY },
];

export const TODO: string = "todo";
