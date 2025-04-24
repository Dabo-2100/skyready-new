import { userAuth } from "./apis/user_auth";
import { userLogin } from "./apis/user_login";

export const UserRepo = {
    user_login: async (email, password) => await userLogin(email, password),
    user_auth: async () => await userAuth(),
}