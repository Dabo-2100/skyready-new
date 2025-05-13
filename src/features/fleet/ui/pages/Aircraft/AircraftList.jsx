import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { noRefreshState } from "../../../../../zustand-store";
import Loader from "../../../../../shared/ui/components/Loader";
import { FaSort } from "react-icons/fa";
export default function AircraftList() {
  const [view, setView] = useState([]);
  const [search, setSearch] = useState("");
  const { data: aircraftList, isLoading } = useQuery({ queryKey: ["aircraftList"], queryFn: () => AircraftRepo.index_aircraft(activePage, null), ...noRefreshState });
  const navigate = useNavigate();
  const [activePage] = useState(1);

  const [sort, setSort] = useState({ serialNo: null, tailNo: null, registrationNo: null });

  useEffect(() => {
    setView(aircraftList || []);
  }, [aircraftList]);

  useEffect(() => {
    if (search) {
      setView(
        aircraftList?.filter(
          (el) =>
            el.serialNo.toLowerCase().includes(search.toLowerCase()) ||
            el.tailNo.toLowerCase().includes(search.toLowerCase()) ||
            el.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
            el.aircraft_model?.name.toLowerCase().includes(search.toLowerCase()) ||
            el.aircraft_usage?.name.toLowerCase().includes(search.toLowerCase()) ||
            el.aircraft_status?.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setView(aircraftList || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (sort.serialNo) {
      setView(aircraftList?.sort((a, b) => (sort.serialNo ? a.serialNo.localeCompare(b.serialNo) : b.serialNo.localeCompare(a.serialNo))));
    }
    if (sort.tailNo) {
      setView(aircraftList?.sort((a, b) => (sort.tailNo ? a.tailNo.localeCompare(b.tailNo) : b.tailNo.localeCompare(a.tailNo))));
    }
    if (sort.registrationNo) {
      setView(aircraftList?.sort((a, b) => (sort.registrationNo ? a.registrationNo.localeCompare(b.registrationNo) : b.registrationNo.localeCompare(a.registrationNo))));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {isLoading && <Loader />}

      <div className="flex justify-between items-center p-4">
        <div className="flex gap-3 grow items-center">
          {/* <h1 className="text-lg font-bold">Aircraft List</h1> */}
          <input className="my-input" type="search" placeholder="Search Aircraft Fleet" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-3">
          <Link to="aircraft/new" className="btn btn-primary text-white">
            + New Aircraft
          </Link>
        </div>
      </div>

      <div className="flex p-4 w-full grow overflow-hidden">
        <div className="w-full overflow-auto rounded-box border border-base-content/5">
          <table className="table text-center border-gray-200">
            <thead>
              <tr className="text-[var(--color-text)] border-b border-gray-200 bg-[var(--color-bg)]">
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
                  <Link to="aircraft/model" className="w-full underline hover:text-primary text-center">
                    Aircraft Model
                  </Link>
                </th>
                <th>
                  <Link to="aircraft/usage" className="w-full underline hover:text-primary text-center">
                    Usage
                  </Link>
                </th>
                <th>
                  <Link to="aircraft/status" className="w-full underline hover:text-primary text-center">
                    Status
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {view?.map((el, index) => (
                <tr key={el.documentId} className="transition cursor-pointer border-b border-gray-200 hover:bg-gray-100" onClick={() => navigate("aircraft/" + el.documentId)}>
                  <th>{index + (activePage - 1) * 25 + 1}</th>
                  <td>{el.serialNo}</td>
                  <td>{el.tailNo}</td>
                  <td>{el.registrationNo}</td>
                  <td>{el.aircraft_model?.name}</td>
                  <td>{el.aircraft_usage?.name}</td>
                  <td>
                    <div className={el?.aircraft_status?.bgColor}>{el.aircraft_status?.name}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
