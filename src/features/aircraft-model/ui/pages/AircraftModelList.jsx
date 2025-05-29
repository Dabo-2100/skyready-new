import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AircraftModelRepo } from "../../data/AircraftModelRepo";
import { noRefreshState } from "../../../../zustand-store";
import Loader from "../../../../shared/ui/components/Loader";
export default function AircraftModelList() {
  const navigate = useNavigate();
  const [aircraftModelList, setModelList] = useState([]);
  const [view, setView] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, isLoading } = useQuery({ queryKey: ["aircraftModels", activePage], queryFn: () => AircraftModelRepo.index_aircraft_models(activePage), ...noRefreshState });

  useEffect(() => {
    setModelList(data?.records);
    setTotalPages(Math.ceil(data?.total / 25));
  }, [data]);

  useEffect(() => {
    setView(aircraftModelList || []);
  }, [aircraftModelList]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {isLoading && <Loader />}
      <div className="flex p-4 w-full grow overflow-auto items-start">
        <table className="table text-center border-gray-200">
          <thead>
            <tr className="text-[var(--color-text)] border-b border-gray-200 bg-[var(--color-bg)]">
              <th>#</th>
              <th>Model Name</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {view?.map((el, index) => (
              <tr key={el.documentId} className="transition cursor-pointer border-b border-gray-200 hover:bg-gray-100" onClick={() => navigate(el.documentId)}>
                <th>{index + (activePage - 1) * 25 + 1}</th>
                <td>{el.name}</td>
                <td>{el.manufacturer?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
