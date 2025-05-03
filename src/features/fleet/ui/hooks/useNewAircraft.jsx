import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AircraftRepo } from "../../data/AircraftRepo";

const useNewAircraft = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation(
        {

            mutationFn: (values) => AircraftRepo.store_aircraft(values),

            onSuccess: async (res) => {
                await Swal.fire({
                    icon: res ? "success" : "error",
                    title: res ? "Aircraft created successfully!" : "Something went wrong!",
                    timer: 2000,
                });

                if (res) {
                    queryClient.setQueryData(["aircraftList"], res);
                    navigate("/fleet/aircraft/");
                }
            },
            onError: async () => {
                toast.error('Something went wrong', { duration: 1500, position: "top-center" })
            },
        }
    );
};

export default useNewAircraft;
