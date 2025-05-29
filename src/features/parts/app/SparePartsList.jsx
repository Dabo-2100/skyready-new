import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SparePartsRepo } from "../data/SparePartsRepo";
import { allFilters, noRefreshState } from "../../../zustand-store";
import Loader from "../../../shared/ui/components/Loader";
import { UserAuthorties } from "../../../services/featureService";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function SparePartList() {
  const navigate = useNavigate();
  const [sparePartsList, setParePartList] = useState([]);
  const [view, setView] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, isLoading } = useQuery({ queryKey: ["sparePartsList", activePage], queryFn: () => SparePartsRepo.index_spare_parts(activePage), ...noRefreshState });

  const handleSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    setParePartList(data?.records);
    setTotalPages(Math.ceil(data?.total / 25));
  }, [data]);

  useEffect(() => {
    setView(sparePartsList || []);
  }, [sparePartsList]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {isLoading && <Loader />}

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 justify-between items-center p-4">
        <Formik initialValues={{ searchVal: "", filterType: 1 }} onSubmit={handleSubmit}>
          {({ values }) => (
            <div className="flex gap-3 w-full md:w-auto items-center">
              <Form className="flex gap-4">
                <div className="flex flex-col">
                  <Field name="searchVal" className="my-input" type="search" placeholder={"Search Part By " + allFilters?.find((el) => el.id == values.filterType)?.name} />
                  <ErrorMessage name="searchVal" component={"div"} className="text-red-500" />
                </div>
                <Field name="filterType" className="my-input" as="select">
                  {allFilters.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </Field>
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </Form>
            </div>
          )}
        </Formik>
        <div className="flex gap-3 justify-end">
          {UserAuthorties().canCreate("spare") && (
            <Link to="new" className="btn btn-primary text-white w-full md:w-auto">
              + New Spare Part
            </Link>
          )}
        </div>
      </div>

      <div className="flex p-4 w-full grow overflow-auto">
        <table className="table text-center border-gray-200">
          <thead>
            <tr className="text-[var(--color-text)] border-b border-gray-200 bg-[var(--color-bg)]">
              <th>#</th>
              <th>Part No</th>
              <th>Part Description</th>
              <th>Part Category</th>
            </tr>
          </thead>
          <tbody>
            {view?.map((el, index) => (
              <tr key={el.documentId} className="transition cursor-pointer border-b border-gray-200 hover:bg-gray-100" onClick={() => navigate(el.documentId)}>
                <th>{index + (activePage - 1) * 25 + 1}</th>
                <td>{el.partNo}</td>
                <td>{el.description}</td>
                <td>{el?.aircraft_part_category?.name || "-----"}</td>
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
