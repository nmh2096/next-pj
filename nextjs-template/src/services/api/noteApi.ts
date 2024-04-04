import { apiService } from "..";

export const getNoteListApi = async () =>  await apiService.get("/note/list");
  
export const createNoteListApi = async (body: any) =>
  await apiService.post("/note/create", body);
export const updateApi = async (body: any, id: string) =>
  await apiService.put(`/note/update/${id}`, body);
export const deleteApi = async (id: string) =>
  await apiService.delete(`/note/delete/${id}`);