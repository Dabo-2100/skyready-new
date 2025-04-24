import axios from "axios"
import { domain } from "../../../zustand-store"

export const userAuth = async () => {
    let token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return await axios.get(`${domain}/api/users/me`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data).catch(() => false);
}