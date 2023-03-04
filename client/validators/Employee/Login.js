import * as yup from "yup";

export default yup.object({
  nroDoc: yup
    .number()
    .required("This field is required")
    .positive()
    .max(9999999999, "The number must be less 15 characters"),
  password: yup.string().required("This field is required"),
}); 