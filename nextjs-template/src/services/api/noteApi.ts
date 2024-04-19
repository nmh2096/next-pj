import { apiService } from "..";

export const getNoteListApi = async () => await apiService.get("/note/list");

export const createApi = async (body: any) =>
  await apiService.post("/note/create", body);

export const getNoteDetailApi = async (_id: string) =>
  await apiService.get(`/note/detail/${_id}`);

export const updateNoteApi = async (id: string,body: any) =>
  await apiService.put(`/note/update/${id}`, body);

export const deleteNoteApi = async (id: string) =>
  await apiService.delete(`/note/delete/${id}`);