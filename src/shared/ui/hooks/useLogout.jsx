import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/authService";
export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return () => {
    AuthService.clearToken();
    queryClient.clear();
    navigate("/login");
  };
}
