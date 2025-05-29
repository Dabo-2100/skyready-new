import { useParams } from "react-router-dom";
import { AuthService } from "../../../../services/authService";
import { useQuery } from "@tanstack/react-query";
import { allFilters, noRefreshState } from "../../../../zustand-store";
import { UserRepo } from "../../../../shared/data/UserRepo";
import { WarehouseRepo } from "../../data/WarehouseRepo";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../../../shared/ui/components/Loader";
import { SparePartsRepo } from "../../../spares/data/SparePartsRepo";

export default function WarehouseItems() {
  const [activeFilter, setActiveFilter] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [pagesNo, setPagesNo] = useState(10);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [view, setView] = useState([]);

  let token = AuthService.getToken();
  const warehouse_id = useParams()?.warehouse_id;

  const { data: userInfo } = useQuery({ queryKey: ["userInfo"], ...noRefreshState, queryFn: UserRepo.user_auth, enabled: !!token });
  const { data: warehouseInfo } = useQuery({ queryKey: ["warehouseInfo"], queryFn: () => WarehouseRepo.warehouse_details(warehouse_id), enabled: !!warehouse_id });
  const { data, dataIsLoading } = useQuery({ queryKey: ["sparePartsList", activePage], queryFn: () => SparePartsRepo.index_spare_parts(activePage), ...noRefreshState });

  const handleFilterChange = (event) => {
    setActiveFilter(event.target.value);
  };

  useEffect(() => {}, [activePage]);

  const validationSchema = Yup.object({ serachValue: Yup.string().min(3, "Search Values must be at latest 3 chars").required("Search Value is Required") });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="w-full h-full grow flex flex-col">
      {dataIsLoading && <Loader />}
      <div className="w-full py-3 flex items-center gap-3">
        <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={{ serachValue: "" }}>
          <Form className="flex gap-3 items-start">
            <div className="flex flex-col w-1/2">
              <Field name="serachValue" className="my-input w-full" placeholder={`Search Items By ${allFilters?.find((el) => el.id == activeFilter)?.name}`} />
              <ErrorMessage name="serachValue" component={"div"} className="text-sm text-red-500" />
            </div>
            <select className="my-input" defaultValue={activeFilter} onChange={handleFilterChange}>
              {allFilters.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </Form>
        </Formik>
      </div>

      <div className="w-full h-10 grow bg-yellow-200 overflow-auto">
        <h1>Data Will Be Here</h1>
        <h1 style={{ height: "500vh" }}></h1>
      </div>

      <div className="w-full p-3 flex justify-center">
        <div className="join">
          <button className="join-item btn" onClick={() => setActivePage((prev) => prev - 1)} disabled={activePage == 1}>
            «
          </button>
          <button className="join-item btn">Page {activePage}</button>
          <button className="join-item btn" onClick={() => setActivePage((prev) => prev + 1)} disabled={pagesNo == activePage}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}
