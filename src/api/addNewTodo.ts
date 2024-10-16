import API from "../axiosConfig";

type IProps = {
    title: string;
    description: string;
};

export const addNewTodo = async (params: IProps) => {
    try {
        const response = await API.post("/todo", { ...params });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
