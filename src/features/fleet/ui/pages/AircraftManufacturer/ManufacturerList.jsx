import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { noRefreshState } from "../../../../../zustand-store";
import Loader from "../../../../../shared/ui/components/Loader";
export default function ManufacturerList() {
    const { data: aircraftManufacturers, isLoading } = useQuery({ queryKey: ['aircraftManufacturers'], queryFn: () => AircraftRepo.index_aircraft_manudacturers(), ...noRefreshState });
    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            {isLoading && <Loader />}
            <div className="flex justify-between items-center p-4">
                <div className="flex gap-3 grow items-center">
                    <h1 className="text-lg font-bold">Aircraft Manufacturer List</h1>
                </div>
                <div className="flex gap-3" >
                    <Link to="new" className="btn btn-soft btn-primary">New Manufacturer</Link>
                </div>
            </div>
            <div className="flex p-4 w-full">
                <div className="w-full overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aircraftManufacturers?.map((manufacturer, index) => (
                                <tr key={manufacturer.id}>
                                    <td>{index + 1}</td>
                                    <td>{manufacturer.name}</td>
                                    <td>Actions</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
