export interface ResponseMessage {
  result: boolean;
  data?: any;
  errors: { field: string; message: string }[];
}
