import * as yup from "yup";

export default yup.object({
  name: yup
    .string()
    .min(1, "the surname must no be empty")
    .required("This field is required"),
  surname: yup
    .string()
    .min(1, "the surname must no be empty")
    .required("This field is required"),
  nroDocument: yup
    .number()
    .required("This field is required")
    .positive()
    .max(Number("9".repeat(15)), "The number must be less 15 characters"),
  birthDate: yup
    .date()
    .required("This field is required")
    .min(
      new Date(1820, 0, 1),
      "The number must be greater than to the 1820 year"
    ),
  email: yup
    .string()
    .email("The email must be valid")
    .required("This field is required"),
  type: yup
    .string()
    .required("This field is required"),
  phone: yup
    .string()
    .min(1, "the phone must no be empty")
    .required("This field is required"),
  accessCode: yup
    .string()
    .min(6, "the accesscode must has length 6")
    .required("This field is required")
});
