import { apiService } from "..";

export const getNoteListApi = async () =>  await apiService.get("/note/list");
  
export const createApi = async (body: any) =>
  await apiService.post("/note/list", body);
export const updateApi = async (body: any, id: string) =>
  await apiService.put(`/note/list/${id}`, body);
export const deleteApi = async (id: string) =>
  await apiService.delete(`/note/list/${id}`);