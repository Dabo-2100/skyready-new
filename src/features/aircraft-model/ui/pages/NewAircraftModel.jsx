import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { noRefreshState } from "../../../../zustand-store";
import { AircraftModelRepo } from "../../data/AircraftModelRepo";
import Loader from "../../../../shared/ui/components/Loader";
import { AircraftManufacturerRepo } from "../../../aircraft-manufacturer/data/AircraftManufacturerRepo";
import useNewAircraftModel from "../hooks/useNewAircraftModel";

export default function NewAircraftModel() {
  // Queries
  const { data: manufacturers, manufacturersIsLoading } = useQuery({ queryKey: ["manufacturers"], queryFn: () => AircraftManufacturerRepo.index_manufacturers(0), ...noRefreshState });
  const { data: aircraftModels, isLoading } = useQuery({ queryKey: ["aircraftModels"], queryFn: () => AircraftModelRepo.index_aircraft_models(0), ...noRefreshState });
  const { mutate: newAircraftModel } = useNewAircraftModel();
  //   // Formik
  const initialValues = { name: "", manufacturer: -1 };
  const validationSchema = Yup.object({
    name: Yup.string()
      .test("unique-model-name", "Aircraft Model already exists", function (value) {
        if (!value) return true;
        const normalized = value.toLowerCase().trim();
        return !aircraftModels?.records?.some((m) => m.name.toLowerCase().trim() === normalized);
      })
      .required("Aircraft Model name is required"),
    manufacturer: Yup.string().required("Manufacture is required"),
  });

  //   // Handlers
  const handleSubmit = (values) => {
    newAircraftModel(values);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto p-3">
      {(isLoading || manufacturersIsLoading) && <Loader />}
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values }) => {
          return (
            <Form className="flex flex-col w-full h-full">
              <div className="w-full p-3 pt-1 flex items-center justify-between gap-3 border-b border-b-gray-200">
                <Link to="/model" className="text-primary flex items-center gap-2">
                  <FaLongArrowAltLeft /> Back
                </Link>
                <h1 className="font-semibold text-xl">Add New Aircraft Model</h1>
                <button className="bg-[#004AAD] hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow cursor-pointer" type="submit">
                  Save
                </button>
              </div>
              <div className="w-full grow p-3">
                <div className="bg-white rounded p-3 w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:col-span-2 lg:col-span-3">
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center justify-between">
                          <p className="flex items-center gap-2">
                            Manufacturer <span className="text-[#DC2626]">*</span>
                          </p>
                          <Link to="/fleet/aircraft/manufacturer">
                            <FaGear className="bg-primary text-white rounded-lg p-1 text-2xl" />
                          </Link>
                        </label>
                        <Field as="select" name="manufacturer" className="select w-full">
                          <option value={-1} hidden>
                            Select Manufacturer
                          </option>
                          {manufacturers?.records?.map((el) => (
                            <option key={el.documentId} value={el.documentId}>
                              {el.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="manufacturer" component={"div"} className="text-[#DC2626]" />
                      </div>
                      {values.manufacturer != -1 && (
                        <div className="flex flex-col gap-2">
                          <label className="flex items-center justify-between">
                            <p className="flex items-center gap-2">
                              Model Name <span className="text-[#DC2626]">*</span>
                            </p>
                            <Link to="/fleet/aircraft/manufacturer">
                              <FaGear className="bg-primary text-white rounded-lg p-1 text-2xl" />
                            </Link>
                          </label>
                          <Field type="text" className="my-input" name="name" placeholder="Enter New Module Name" />
                          <ErrorMessage name="name" component={"div"} className="text-[#DC2626]" />
                        </div>
                      )}
                    </div>
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
