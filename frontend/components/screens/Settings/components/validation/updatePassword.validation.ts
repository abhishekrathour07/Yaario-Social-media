import * as yup from "yup";

export const passwordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(6, "Minimum 6 characters"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Minimum 6 characters"),

  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your new password"),
});
