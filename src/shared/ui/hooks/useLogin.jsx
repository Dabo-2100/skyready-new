import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserRepo } from "../../data/UserRepo";
import { AuthService } from "../../../services/authService";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserRepo.user_login,

    onSuccess: async (res) => {
      const message = res ? "Login successfully!" : "Wrong username or password!";
      const id = toast.loading("Logging in...");
      toast.dismiss(id);

      toast[res ? "success" : "error"](message, {
        duration: 2000,
        position: "top-center",
        style: {
          fontFamily: "Inter",
          background: res ? "#004AAD" : "#EF4444",
          color: "#fff",
        },
      });

      if (res) {
        queryClient.setQueryData(["userInfo"], res);
        navigate("/");
      } else {
        AuthService.clearToken();
      }
    },

    onError: async () => {
      toast.error("Wrong email or password", {
        duration: 1500,
        position: "top-center",
      });
    },
  });
};

export default useLogin;
