
export interface IAuthStore {
  loading: boolean;
  message: string;
  success: boolean;
  profile: IAuth | null
}

export interface IAuth {
  _id?: string;
  name?: string;
  username: string;
  password?: string;
}
