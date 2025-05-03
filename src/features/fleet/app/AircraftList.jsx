import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AircraftRepo } from "../data/AircraftRepo";
import { noRefreshState } from "../../../zustand-store";
import clsx from "clsx";
import Loader from "../../../shared/ui/components/Loader";
import { FaSort } from "react-icons/fa";
export default function AircraftList() {
    const [view, setView] = useState([]);
    const [search, setSearch] = useState("");
    const { data: aircraftList, isLoading } = useQuery({ queryKey: ['aircraftList'], queryFn: () => AircraftRepo.index_aircraft(activePage, null), ...noRefreshState });
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);

    const [sort, setSort] = useState({
        serialNo: null,
        tailNo: null,
        registrationNo: null,
    });


    const statusStyle = (bgColor) => {
        return clsx("badge badge-soft h-auto ", bgColor ? `badge-${bgColor}` : "badge-info");
    };

    useEffect(() => { setView(aircraftList || []) }, [aircraftList]);

    useEffect(() => {
        if (search) {
            setView(aircraftList?.filter(el => el.serialNo.toLowerCase().includes(search.toLowerCase()) || el.tailNo.toLowerCase().includes(search.toLowerCase()) || el.registrationNo.toLowerCase().includes(search.toLowerCase()) || el.aircraft_model?.name.toLowerCase().includes(search.toLowerCase()) || el.aircraft_usage?.name.toLowerCase().includes(search.toLowerCase()) || el.aircraft_status?.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setView(aircraftList || []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        if (sort.serialNo) {
            setView(aircraftList?.sort((a, b) => sort.serialNo ? a.serialNo.localeCompare(b.serialNo) : b.serialNo.localeCompare(a.serialNo)));
        }
        if (sort.tailNo) {
            setView(aircraftList?.sort((a, b) => sort.tailNo ? a.tailNo.localeCompare(b.tailNo) : b.tailNo.localeCompare(a.tailNo)));
        }
        if (sort.registrationNo) {
            setView(aircraftList?.sort((a, b) => sort.registrationNo ? a.registrationNo.localeCompare(b.registrationNo) : b.registrationNo.localeCompare(a.registrationNo)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);
    return (
        <div className='w-full h-full'>
            {isLoading && <Loader />}
            <div className="flex justify-between items-center p-4">
                <div className="flex gap-3 grow items-center">
                    <h1 className="text-lg font-bold">Aircraft List</h1>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"> <circle cx="11" cy="11" r="8"></circle> <path d="m21 21-4.3-4.3"></path> </g> </svg>
                        <input type="search" placeholder="Search Aircraft Fleet" onChange={(e) => setSearch(e.target.value)} />
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
                                <th>
                                    <div className="flex items-center gap-2">
                                        <span>Serial No</span>
                                        <FaSort onClick={() => setSort({ ...sort, serialNo: !sort.serialNo })} />
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center gap-2">
                                        <span>Tail No</span>
                                        <FaSort onClick={() => setSort({ ...sort, tailNo: !sort.tailNo })} />
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center gap-2">
                                        <span>Registration No</span>
                                        <FaSort onClick={() => setSort({ ...sort, registrationNo: !sort.registrationNo })} />
                                    </div>
                                </th>
                                <th>
                                    <Link to="model" className="w-full underline hover:text-primary text-center">
                                        Aircraft Model
                                    </Link>
                                </th>
                                <th>
                                    <Link to="usage" className="w-full underline hover:text-primary text-center">
                                        Usage
                                    </Link>
                                </th>
                                <th>
                                    <Link to="status" className="w-full underline hover:text-primary text-center">
                                        Status
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                view?.map((el, index) => (
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
