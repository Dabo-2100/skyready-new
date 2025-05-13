import { userAuth } from "./apis/user_auth";
import { userLogin } from "./apis/user_login";

export const UserRepo = {
  user_login: userLogin,
  user_auth: userAuth,
};
