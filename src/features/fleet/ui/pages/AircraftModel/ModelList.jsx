import { useQuery } from "@tanstack/react-query";
import { noRefreshState } from "../../../../../zustand-store";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { useEffect, useState } from "react";
import Loader from "../../../../../shared/ui/components/Loader";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function ModelList() {
  const { data: aircraftManufacturers } = useQuery({ queryKey: ["aircraftManufacturers"], queryFn: AircraftRepo.index_aircraft_manudacturers, ...noRefreshState });
  const { data: aircraftModels, isLoading } = useQuery({ queryKey: ["aircraftModels"], queryFn: () => AircraftRepo.index_aircraft_models(manufacturerId), ...noRefreshState });
  const [manufacturerId, setManufacturerId] = useState(null);
  const [filteredAircraftModels, setFilteredAircraftModels] = useState([]);
  useEffect(() => {
    if (manufacturerId) {
      setFilteredAircraftModels(aircraftModels?.filter((model) => model.aircraft_manufacturer.documentId === manufacturerId));
    }
  }, [manufacturerId]);

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      {isLoading && <Loader />}
      <div className="flex flex-col w-full h-full overflow-auto">
        <div className="flex justify-between items-center p-4 w-full">
          <Link to="../" className="text-primary flex items-center gap-2">
            <FaLongArrowAltLeft /> Back
          </Link>
          <h1 className="text-2xl font-bold p3">Model List</h1>
          <div className="flex items-center gap-2 ">
            <Link className="underline hover:text-primary grow" to="/fleet/aircraft/manufacturer">
              Manufacturer
            </Link>
            <select
              className="select select-bordered"
              onChange={(e) => {
                setManufacturerId(e.target.value);
              }}>
              {aircraftManufacturers?.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
