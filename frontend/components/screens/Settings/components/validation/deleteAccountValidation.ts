import * as yup from "yup"

export const deleteAccountSchema = yup.object().shape({
    confirm: yup
        .string()
        .required("Confirmation is required")
        .oneOf(["delete my account"], "You must type 'delete my account'"),
})
