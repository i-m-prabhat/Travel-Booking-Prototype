import axiosInstance from "./axiosInstance";


export const createPayment = async (payload: any): Promise<any> =>
{
    const { data } = await axiosInstance.post<any>("/payments/initiate", payload);
    return data;
};


export const verifyPayment = async (payload: any): Promise<any> =>
{
    const { data } = await axiosInstance.post<any>("/payments/verify", payload);
    return data;
};