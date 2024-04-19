export interface ICardStore {
  loading: boolean;
  message: string;
  success: boolean;
  cardList: ICard[];
  card: ICard | null;
}

export interface ICard {
  _id?: string;
  title: string;
  url: string;
  status: string;
}