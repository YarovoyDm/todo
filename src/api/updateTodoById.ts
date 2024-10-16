import API from "../axiosConfig";

type IProps = {
    title: string;
    description: string;
};

export const updateTodoById = async (id: number, params: IProps) => {
    try {
        const response = await API.put(`/todo/${id}`, { ...params });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
