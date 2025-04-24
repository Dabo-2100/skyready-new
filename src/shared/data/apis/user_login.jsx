import axios from "axios"
import { domain } from "../../../zustand-store"

export const userLogin = async (identifier, password) => {
    return await axios.post(`${domain}/api/auth/local`, { identifier, password }).then(res => res.data).catch(() => false);
}