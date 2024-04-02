import { apiService } from ".."

export const loginApi = async (body: any) =>
  await apiService.post("/auth/login", body);
export const registerApi = async (body: any) => {
  await apiService.post("/auth/register", body);
}

export const getCommentApi = async () => await apiService.get("/comments");

export const updateNote = async (id: string, body: any) => {
  await apiService.post(`/note/update/${id}`, body);
}
