import API from "../axiosConfig";

export const registerUser = async () => {
    try {
        const response = await API.post("/auth");

        const { user, accessToken, refreshToken } = response.data;

        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", user.id);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
