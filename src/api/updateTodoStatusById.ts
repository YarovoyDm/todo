import API from "../axiosConfig";

type IProps = {
    id: number;
    status: string;
};

export const updateTodoStatusById = async (params: IProps) => {
    try {
        const response = await API.put(`/todo/status/${params.id}`, {
            status: params.status,
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
