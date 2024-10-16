export const PENDING: string = "Pending";
export const DONE: string = "Done";
export const WONT_DO: string = "Won't do";

const PUNCH: string = "#d62828";
const CASABLANCA: string = "#FCBF49";
const GLADE_GREEN: string = "#588157";

export const TODO_STATUS_MAP: Array<{ name: string; color: string }> = [
    { name: PENDING, color: CASABLANCA },
    { name: DONE, color: GLADE_GREEN },
    { name: WONT_DO, color: PUNCH },
];

export const TODO: string = "todo";
