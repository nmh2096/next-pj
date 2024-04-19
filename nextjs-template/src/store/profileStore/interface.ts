export interface IProfileStore {
  loading: boolean;
  message: string;
  success: boolean;
  profileList: IProfile[];
  profile: IProfile | null;
}

export interface IProfile {
  _id?: string;
  name: string;
  username: string;
  password: string;
}