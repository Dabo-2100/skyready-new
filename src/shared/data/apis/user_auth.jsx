import axios from "axios"
export const userAuth = async () => {
    return await axios.get('http://82.112.241.233:2000/api/users/me', { headers: { Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}` } }).then(res => res.data).catch(() => false);
}