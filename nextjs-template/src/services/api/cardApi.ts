import apiService from "../apiService";

export const getCardListApi = async () => await apiService.get("/linkcard/list");

export const createCardApi = async (body: any) =>
  await apiService.post("/linkcard/create", body);

export const getCardDetailApi = async (_id: string) =>
  await apiService.get(`/linkcard/detail/${_id}`);

export const updateCardApi = async (id: string,body: any) =>
  await apiService.put(`/linkcard/update/${id}`, body);

export const deleteCardeApi = async (id: string) =>
  await apiService.delete(`/linkcard/delete/${id}`);
