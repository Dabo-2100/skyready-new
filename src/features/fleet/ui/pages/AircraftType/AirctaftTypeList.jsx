import { useQuery } from "@tanstack/react-query";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { noRefreshState } from "../../../../../zustand-store";
import { Link } from "react-router-dom";

export default function TypeList() {
    const { data: aircraftTypes } = useQuery({ queryKey: ['aircraftTypes'], queryFn: AircraftRepo.index_aircraft_types, ...noRefreshState });

    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            <div className="flex flex-col w-full h-full overflow-auto">
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-2xl font-bold p3">Aircraft Types</h1>
                    <Link to="new" className="btn btn-primary">New Aircraft Type</Link>
                </div>
                <div className="flex flex-col w-full h-full overflow-auto">
                    <div className="flex p-4 w-full">
                        <div className="w-full overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>-</th>
                                        <th>Type Name</th>
                                        <th>Manufacturer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        aircraftTypes?.map((type, index) => (
                                            <tr key={type.documentId} className="hover:bg-base-300 transition cursor-pointer">
                                                <th>{index + 1}</th>
                                                <td>
                                                    <Link to={type.documentId}>
                                                        {type.name}
                                                    </Link>
                                                </td>
                                                <td>{type.aircraft_manufacturer.name}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
