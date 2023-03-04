import * as yup from "yup";

export default yup.object({
  name: yup
    .string()
    .min(1, "the name must not be empty")
    .required("This field is required"),
  brand: yup
    .string()
    .min(1, "the brand must not be empty")
    .required("This field is required"),
  avaliableQuantity: yup
    .number("the avaliable quantity must be a number")
    .positive("the avaliable quantity must be a positive number")
    .min(0, "the avaliable quantity must be minimum 0")
    .required("This field is required"),
  price: yup
    .number("the price must be a number")
    .positive("the price must be a positive number")
    .min(0, "the price must be minimum 0")
    .required("This field is required"),
  description: yup
    .string(),
  grammage: yup
    .number("the grammage must be a number")
    .positive("the grammage must be a positive number")
    .min(0, "the  must be minimum 0")
    .required("This field is required"),
});
