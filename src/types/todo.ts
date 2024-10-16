export type ITodo = {
    id: number;
    title: string;
    description: string;
    status: string;
};

export type Todos = {
    todos: ITodo[];
};
