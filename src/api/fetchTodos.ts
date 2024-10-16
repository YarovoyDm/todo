import API from "../axiosConfig";

export const fetchTodos = async () => {
    try {
        const response = await API.get("/todo");

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
