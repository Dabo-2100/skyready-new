import { useQuery } from "@tanstack/react-query";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { noRefreshState } from "../../../../../zustand-store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../../../../shared/ui/components/Loader";
import * as Yup from "yup";
import useNewManufacturer from "../../hooks/useNewManufacturer";
export default function NewManufacturer() {
  const { mutate: createManufacturer, isLoading: isCreating } = useNewManufacturer();
  const { data: aircraftManufacturers, isLoading } = useQuery({ queryKey: ["aircraftManufacturers"], queryFn: AircraftRepo.index_aircraft_manudacturers, ...noRefreshState });
  const initialValues = { name: "", country: "" };
  const validationSchema = Yup.object({
    name: Yup.string()
      .test("unique-manufacturer-name", "Manufacturer already exists", function (value) {
        if (!value) return true;
        const normalized = value.toLowerCase().trim();
        return !aircraftManufacturers?.some((m) => m.name.toLowerCase().trim() === normalized);
      })
      .required("Manufacturer name is required"),
    country: Yup.string().required("Country is required"),
  });

  const handleSubmit = (values) => {
    createManufacturer(values);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      {isLoading && <Loader />}
      {isCreating && <Loader />}
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {() => {
          return (
            <Form className="flex flex-col w-full h-full">
              <div className="w-full p-3 flex items-center justify-between gap-3 border-b border-b-slate-50/20">
                <Link to="../" className="text-primary flex items-center gap-2">
                  <FaLongArrowAltLeft /> Back
                </Link>
                <h1 className="font-bold text-2xl">Add New Aircraft Manufacturer</h1>
              </div>
              <div className="w-full grow p-3  bg-red">
                <div className="bg-black/30 rounded p-3 w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Field type="text" id="name" name="name" className="w-full rounded p-2 bg-black/30" />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="country" className="text-sm font-medium">
                        Country
                      </label>
                      <Field type="text" id="country" name="country" className="w-full rounded p-2 bg-black/30" />
                      <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                      Add Manufacturer
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
