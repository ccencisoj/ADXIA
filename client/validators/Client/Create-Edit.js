import * as yup from "yup";

export default yup.object({
  name: yup
    .string()
    .min(5, "the name must has more than fives chracters")
    .required("This field is required"),
  lastname: yup
    .string()
    .min(2, "the lastname must has more than two chracters")
    .required("This field is required"),
  nroDoc: yup
    .number()
    .required("This field is required")
    .positive()
    .max(9999999999, "The number must be less 15 characters"),
  phone: yup
    .number()
    .required("This field is required")
    .positive()
    .max(9999999999, "The number must be less 10 characters"),
  address: yup
    .string()
    .min(5, "the adress must has more than fives chracters")
    .required("This field is required"),
  business: yup
    .string()
    .min(2, "the business mush has more than twos characters")
    .required("This field is required")
});
