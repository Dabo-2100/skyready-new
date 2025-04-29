import * as Yup from "yup";
export const AircraftSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required')
});