import axiosInstance from "./axiosInstance";

export const getAllTrips = async (params: any): Promise<any> =>
{
    const { data } = await axiosInstance.get<any>("/trips", {
        params,
    });
    return data;
};


export const getTripsById = async (id: any): Promise<any> =>
{
    const { data } = await axiosInstance.get<any>(`/trips/${id}`);
    return data;
};



export const createNewTrip = async (payload: any): Promise<any> =>
{
    const { data } = await axiosInstance.post<any>("/trips", payload);
    return data;
};