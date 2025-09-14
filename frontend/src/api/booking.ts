import axiosInstance from "./axiosInstance";

export const createNewBooking = async (payload: any): Promise<any> =>
{
    const { data } = await axiosInstance.post<any>("/bookings", payload);
    return data;
};

export const getBookingById = async (id: any): Promise<any> =>
{
    const { data } = await axiosInstance.get<any>(`/bookings/${id}`);
    return data;
}

export const getMyBookings = async (): Promise<any> =>
{
    const { data } = await axiosInstance.get<any>("/bookings/me");
    return data;
}

export const cancelBooking = async (id: any): Promise<any> =>
{
    const { data } = await axiosInstance.delete<any>(`/bookings/${id}`);
    return data;
}

export const getAllBookings = async (): Promise<any> =>
{
    const { data } = await axiosInstance.get<any>("/bookings");
    return data;
}