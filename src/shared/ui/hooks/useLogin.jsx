import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserRepo } from "../../data/UserRepo";

const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: ({ email, password }) => UserRepo.user_login(email, password),

            onSuccess: async (res, variables) => {
                await Swal.fire({
                    icon: res ? "success" : "error",
                    title: res ? "Login successfully!" : "Wrong username or password!",
                    timer: 2000,
                });

                if (res) {
                    queryClient.setQueryData(["userInfo"], res);

                    if (variables.rememberIndex) {
                        localStorage.setItem("token", res.jwt);
                        localStorage.setItem("userInfo", JSON.stringify(res.user));
                    } else {
                        sessionStorage.setItem("token", res.jwt);
                        sessionStorage.setItem("userInfo", JSON.stringify(res.user));
                    }
                    navigate("/");
                } else {
                    localStorage.clear();
                    sessionStorage.clear();
                }
            },
            onError: async (error) => {
                toast.error('Wrong email or password', { duration: 1500, position: "top-center" })
            },
        }
    );
};

export default useLogin;
