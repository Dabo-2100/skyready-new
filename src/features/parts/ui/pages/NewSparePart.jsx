import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../../shared/ui/components/Loader";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { noRefreshState } from "../../../../../zustand-store";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import useNewAircraft from "../../hooks/useNewAircraft";
import { FaGear } from "react-icons/fa6";

export default function NewSparePart() {
  // State
  const [aircraftList, setAircraftList] = useState([]);
  const [modelId, setModelId] = useState(null);
  // Queries
  const { data: aircraftListData } = useQuery({ enabled: !!modelId, queryKey: ["aircraftList", modelId], queryFn: () => AircraftRepo.index_aircraft(1, modelId), ...noRefreshState });
  const { data: aircraftStatuses } = useQuery({ queryKey: ["aircraftStatuses"], queryFn: AircraftRepo.index_aircraft_statuses, ...noRefreshState });
  const { data: aircraftUsages } = useQuery({ queryKey: ["aircraftUsages"], queryFn: AircraftRepo.index_aircraft_usages, ...noRefreshState });
  const { data: manufacturers, isLoading } = useQuery({ queryKey: ["manufacturers"], queryFn: AircraftRepo.index_manufacturers, ...noRefreshState });
  const { mutate: newAircraft } = useNewAircraft();
  // Formik
  const initialValues = { partNo: "", partDesc: "", isSerialized: false, altPartNos: [], aircraft_model: "" };
  const validationSchema = Yup.object({
    serialNo: Yup.string()
      .required("Serial No is required")
      .notOneOf(aircraftList?.map((el) => el.serialNo) || [], "Serial No already exists"),
    tailNo: Yup.string()
      .required("Tail No is required")
      .notOneOf(aircraftList?.map((el) => el.tailNo) || [], "Tail No already exists"),
    customerNo: Yup.string()
      .required("Registration No is required")
      .notOneOf(aircraftList?.map((el) => el.customerNo) || [], "Registration No already exists"),
    aircraft_model: Yup.string().required("Aircraft Model is required"),
    aircraft_usage: Yup.string().required("Aircraft Usage is required"),
    aircraft_status: Yup.string().required("Aircraft Status is required"),
  });

  // Handlers
  const handleSubmit = (values) => {
    delete values.vendorId;
    delete values.typeId;
    newAircraft(values);
  };

  // Effects
  useEffect(() => {
    setAircraftList(aircraftListData);
  }, [aircraftListData]);
  return (
    <div className="flex flex-col w-full h-full overflow-auto p-3">
      {isLoading && <Loader />}
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (values?.aircraft_model && values.aircraft_model !== -1) {
              setModelId(values.aircraft_model);
            }
          }, [values.aircraft_model]);
          return (
            <Form className="flex flex-col w-full h-full">
              <div className="w-full p-3 pt-1 flex items-center justify-between gap-3 border-b border-b-gray-200">
                <Link to="/fleet" className="text-primary flex items-center gap-2">
                  <FaLongArrowAltLeft /> Back
                </Link>
                <h1 className="font-semibold text-xl">Add New Aircraft to fleet</h1>
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
                            Manufacturer<span className="text-[#DC2626]">*</span>
                          </p>
                          <Link to="/fleet/aircraft/manufacturer">
                            <FaGear className="bg-primary text-white rounded-lg p-1 text-2xl" />
                          </Link>
                        </label>
                        <Field as="select" name="vendorId" className="select w-full">
                          <option value={-1} hidden>
                            Select Manufacturer
                          </option>
                          {manufacturers?.map((el, index) => (
                            <option key={el.documentId} value={index}>
                              {el.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="vendorId" component={"div"} className="text-[#DC2626]" />
                      </div>

                      {values?.vendorId != -1 && (
                        <div className="flex flex-col gap-2">
                          <label>
                            Aircraft Type <span className="text-[#DC2626]">*</span>
                          </label>
                          <Field as="select" name="typeId" className="select w-full">
                            <option value={-1} hidden>
                              Select Aircraft Type
                            </option>
                            {manufacturers[values.vendorId]?.aircraft_types?.map((el, index) => (
                              <option key={el.documentId} value={index}>
                                {el.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="typeId" component={"div"} className="text-[#DC2626]" />
                        </div>
                      )}

                      {values?.typeId != -1 && (
                        <div className="flex flex-col gap-2">
                          <label>
                            Aircraft Model <span className="text-[#DC2626]">*</span>
                          </label>
                          <Field as="select" name="aircraft_model" className="select w-full">
                            <option value={-1} hidden>
                              Select Aircraft Model
                            </option>
                            {manufacturers[values.vendorId]?.aircraft_types[values.typeId]?.aircraft_models?.map((el) => (
                              <option key={el.documentId} value={el.documentId}>
                                {el.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="aircraft_model" component={"div"} className="text-[#DC2626]" />
                        </div>
                      )}
                    </div>

                    {values?.aircraft_model != -1 && values?.aircraft_model != "" && (
                      <>
                        <div className="flex flex-col gap-2">
                          <label>
                            Serial No <span className="text-[#DC2626]">*</span>
                          </label>
                          <Field name="serialNo" className="my-input w-full" placeholder="Enter serial no ..." type="text" />
                          <ErrorMessage name="serialNo" component={"div"} className="text-[#DC2626]" />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label>
                            Registration No<span className="text-[#DC2626]">*</span>
                          </label>
                          <Field name="customerNo" className="my-input w-full" placeholder="Enter registeraion no ..." type="text" />
                          <ErrorMessage name="customerNo" component={"div"} className="text-[#DC2626]" />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label>
                            Tail No <span className="text-[#DC2626]">*</span>
                          </label>
                          <Field name="tailNo" className="my-input w-full" placeholder="Enter tail no ..." type="text" />
                          <ErrorMessage name="tailNo" component={"div"} className="text-[#DC2626]" />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label>
                            Aircraft Usage<span className="text-[#DC2626]">*</span>
                          </label>
                          <Field as="select" name="aircraft_usage" className="select w-full">
                            <option value={-1} hidden>
                              Select Aircraft Usage
                            </option>
                            {aircraftUsages?.map((el) => (
                              <option key={el.documentId} value={el.documentId}>
                                {el.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="aircraft_usage" component={"div"} className="text-[#DC2626]" />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label>
                            Aircraft Status<span className="text-[#DC2626]">*</span>
                          </label>
                          <Field as="select" name="aircraft_status" className="select w-full">
                            <option value={-1} hidden>
                              Select Aircraft Status
                            </option>
                            {aircraftStatuses?.map((el) => (
                              <option key={el.documentId} value={el.documentId}>
                                {el.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="aircraft_status" component={"div"} className="text-[#DC2626]" />
                        </div>
                      </>
                    )}
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
