import * as yup from "yup";

export const schema = yup.object().shape({
  // id: yup.string().required("Required field"),
  title: yup.string().required("Required field"),
  url: yup.string().required("Required field"),
  status: yup.string().required("Required field"),
});