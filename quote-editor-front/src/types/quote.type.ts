export interface ResponseMessage {
  result: boolean;
  data?: Quote[];
  errors: { field: string; message: string }[];
}
export interface Quote {
  _id: string;
  author: string;
  quote: string;
  _v: number;
}
