import apiService from "../apiService";

export const authApi = async () =>
  await apiService.get("/auth");
export const profileUpdateApi = async (id: string, body: any) =>
  await apiService.put(`/profile/update/${id}`, body);
