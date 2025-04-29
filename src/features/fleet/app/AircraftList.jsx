import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AircraftRepo } from "../data/AircraftRepo";
import { noRefreshState } from "../../../zustand-store";
import clsx from "clsx";
import Loader from "../../../shared/ui/components/Loader";

export default function AircraftList() {
    const { data: aircraftList, isLoading } = useQuery({ queryKey: ['aircraftList'], queryFn: () => AircraftRepo.index_aircraft(activePage, null), ...noRefreshState });
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);
    const statusStyle = (bgColor) => {
        return clsx("badge badge-soft h-auto ", bgColor ? `badge-${bgColor}` : "badge-info")
    };

    useEffect(() => { }, [activePage]);
    return (
        <div className='w-full h-full'>
            {isLoading && <Loader />}
            <div className="flex justify-between items-center p-4">
                <div className="flex gap-3 grow items-center">
                    <h1 className="text-lg font-bold">Aircraft List</h1>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"> <circle cx="11" cy="11" r="8"></circle> <path d="m21 21-4.3-4.3"></path> </g> </svg>
                        <input type="search" placeholder="Search Aircraft Fleet" />
                    </label>
                </div>
                <div className="flex gap-3" >
                    <Link to="new" className="btn btn-soft btn-primary">New Aircraft</Link>
                </div>
            </div>

            <div className="flex p-4 w-full">
                <div className="w-full overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>-</th>
                                <th>Serial No</th>
                                <th>Tail No</th>
                                <th>Registration No</th>
                                <th>Aircraft Model</th>
                                <th>Usage</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                aircraftList?.map((el, index) => (
                                    <tr key={el.documentId} className="hover:bg-base-300 transition cursor-pointer" onClick={() => navigate(el.documentId)}>
                                        <th>{index + ((activePage - 1) * 25) + 1}</th>
                                        <td>{el.serialNo}</td>
                                        <td>{el.tailNo}</td>
                                        <td>{el.registrationNo}</td>
                                        <td>{el.aircraft_model?.name}</td>
                                        <td>{el.aircraft_usage?.name}</td>
                                        <td>
                                            <div className={statusStyle(el.aircraft_status?.bgColor)}>
                                                {el.aircraft_status?.name}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        Math.ceil(aircraftList?.length / 25) > 1 &&
                        <div className="join w-full flex justify-center p-3">
                            {
                                Array.from({ length: Math.ceil(aircraftList?.length / 25) }, (_, i) => i + 1).map((el, index) => (
                                    <button onClick={() => setActivePage(index)} className={`join-item btn ${activePage == index ? "btn-active" : ""}`} key={el}>{index + 1}</button>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
