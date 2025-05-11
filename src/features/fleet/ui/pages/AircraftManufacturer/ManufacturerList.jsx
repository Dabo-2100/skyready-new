import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { noRefreshState } from "../../../../../zustand-store";
import Loader from "../../../../../shared/ui/components/Loader";
export default function ManufacturerList() {
  const { data: aircraftManufacturers, isLoading } = useQuery({ queryKey: ["aircraftManufacturers"], queryFn: () => AircraftRepo.index_aircraft_manudacturers(), ...noRefreshState });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      {isLoading && <Loader />}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-3 grow items-center">
          <button className="btn btn-soft btn-primary" onClick={() => navigate(-1)}>
            <FaLongArrowAltLeft className="text-primary flex items-center gap-2" /> Back
          </button>
          <h1 className="text-lg font-bold">Aircraft Manufacturer List</h1>
        </div>
        <div className="flex gap-3">
          <Link to="new" className="btn btn-soft btn-primary">
            New Manufacturer
          </Link>
        </div>
      </div>
      <div className="flex p-4 w-full">
        <div className="w-full overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table text-center table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {aircraftManufacturers?.map((manufacturer, index) => (
                <tr onClick={() => navigate(`/fleet/aircraft/manufacturer/${manufacturer.documentId}`)} className="hover:bg-base-300 cursor-pointer" key={manufacturer.documentId}>
                  <td>{index + 1}</td>
                  <td>{manufacturer.name}</td>
                  <td>{manufacturer.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
