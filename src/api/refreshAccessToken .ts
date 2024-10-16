import API from "../axiosConfig";

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = localStorage.getItem("userId");

    try {
        const response = await API.post("/auth/refresh", {
            refreshToken,
            id: userId,
        });

        const newAccessToken = response.data.accessToken;

        sessionStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
