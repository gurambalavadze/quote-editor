import * as yup from "yup";

export const quoteSchema = yup.object().shape({
  quote: yup.string().required().min(5),
  author: yup.string().required().min(5),
});

export const quoteEditSchema = quoteSchema.shape({
  _id: yup.string().required(),
  _v: yup.number().required().min(1),
});
