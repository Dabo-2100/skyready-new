import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AircraftRepo } from "../../data/AircraftRepo";

const useDeleteAircraft = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId) => AircraftRepo.delete_aircraft(documentId),

    onSuccess: async (res) => {
      await Swal.fire({
        icon: res ? "success" : "error",
        title: res ? "Aircraft deleted successfully!" : "Something went wrong!",
        timer: 2000,
      });

      if (res) {
        queryClient.setQueryData(["aircraftList"], (prev) => prev.filter((aircraft) => aircraft.documentId !== res.documentId));
        navigate("../");
      }
    },
    onError: async () => {
      toast.error("Something went wrong", { duration: 1500, position: "top-center" });
    },
  });
};

export default useDeleteAircraft;
