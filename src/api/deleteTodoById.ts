import API from "../axiosConfig";

export const deleteTodoById = async (id: number) => {
    try {
        const response = await API.delete(`/todo/${id}`);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
