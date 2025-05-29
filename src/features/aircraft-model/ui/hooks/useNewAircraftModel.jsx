import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AircraftModelRepo } from "../../data/AircraftModelRepo";

const useNewAircraftModel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values) => AircraftModelRepo.store_aircraft_model(values),

    onSuccess: async (res) => {
      await Swal.fire({
        icon: res ? "success" : "error",
        title: res ? "Aircraft Model created successfully!" : "Something went wrong!",
        timer: 2000,
      });

      if (res && typeof res === "object" && res !== null) {
        queryClient.setQueryData(["aircraftModels"], (prev) => {
          if (!prev?.records || typeof prev?.total !== "number") {
            return { records: [res], total: 1 };
          }
          return { records: [...prev.records, res], total: prev.total + 1 };
        });
      }
      navigate("/model");
    },
  });
};

export default useNewAircraftModel;
