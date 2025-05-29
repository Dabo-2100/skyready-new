import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AircraftRepo } from "../../data/AircraftRepo";
import { UserAuthorties } from "../../../../services/featureService";
import Loader from "../../../../shared/ui/components/Loader";
import { noRefreshState } from "../../../../zustand-store";

export default function AircraftList() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data: aircraftList, isLoading } = useQuery({ queryKey: ["aircraftList", activePage], queryFn: () => AircraftRepo.index_aircraft(activePage, null), ...noRefreshState });

  useEffect(() => {
    setTotalPages(Math.ceil(aircraftList?.total / 25));
  }, [aircraftList, isLoading]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {isLoading && <Loader />}

      <div className="flex justify-between items-center p-4">
        <div className="flex gap-3 grow items-center">
          <input className="my-input" type="search" placeholder="Search Aircraft Fleet" />
        </div>
        <div className="flex gap-3">
          {UserAuthorties().canCreate("fleet") && (
            <Link to="new" className="btn btn-primary text-white">
              + New Aircraft
            </Link>
          )}
        </div>
      </div>

      <div className="flex p-4 w-full grow overflow-hidden">
        <div className="w-full overflow-auto rounded-box border border-base-content/5">
          <table className="table text-center border-gray-200">
            <thead>
              <tr className="text-[var(--color-text)] border-b border-gray-200 bg-[var(--color-bg)]">
                <th>-</th>
                <th>Serial No</th>
                <th>Tail No</th>
                <th>EAF No</th>
                <th>Aircraft Model</th>
                <th>Usage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {aircraftList?.records?.map((el, index) => (
                <tr key={el.documentId} className="transition cursor-pointer border-b border-gray-200 hover:bg-gray-100" onClick={() => navigate(el.documentId)}>
                  <th>{index + (activePage - 1) * 25 + 1}</th>
                  <td>{el.serialNo}</td>
                  <td>{el.tailNo}</td>
                  <td>{el.customerNo}</td>
                  <td>{el.aircraft_model?.name}</td>
                  <td>{el.aircraft_usage?.name}</td>
                  <td>
                    <div className={el?.aircraft_status?.style}>{el.aircraft_status?.name}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full p-3 flex justify-center">
        <div className="join">
          <button className="join-item btn" onClick={() => setActivePage((prev) => prev - 1)} disabled={activePage == 1}>
            «
          </button>
          <button className="join-item btn">Page {activePage}</button>
          <button className="join-item btn" onClick={() => setActivePage((prev) => prev + 1)} disabled={totalPages == activePage}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}
