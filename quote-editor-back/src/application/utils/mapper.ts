import { ResponseMessage } from "./response.type";

export const errorToResponse = (
  field: string,
  message: string
): ResponseMessage => ({
  result: false,
  errors: [{ field: field, message: message }],
});

export const dataToResponse = (data: any): ResponseMessage => ({
  result: true,
  data,
  errors: [],
});
