// AircraftDetails.jsx
import { useQuery } from "@tanstack/react-query";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import Loader from "../../../../../shared/ui/components/Loader";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { noRefreshState } from "../../../../../zustand-store";
import useDeleteAircraft from "../../hooks/useDeleteAircraft";
// import useUpdateAircraft from "../../hooks/useUpdateAircraft";

export default function AircraftDetails() {
  const params = useParams();
  const [modelId, setModelId] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [typeId, setTypeId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { mutate: deleteAircraft } = useDeleteAircraft();
  // const { mutate: updateAircraft, isPending } = useUpdateAircraft();

  const { data: aircraftInfo, isLoading } = useQuery({ queryKey: ["aircraftInfo", params.aircraft_id], queryFn: () => AircraftRepo.show_aircraft(params.aircraft_id) });
  const { data: aircraftManufacturers } = useQuery({ queryKey: ["aircraftManufacturers"], queryFn: AircraftRepo.index_aircraft_manudacturers, ...noRefreshState });
  const { data: aircraftStatuses } = useQuery({ queryKey: ["aircraftStatuses"], queryFn: AircraftRepo.index_aircraft_statuses, ...noRefreshState });
  const { data: aircraftUsages } = useQuery({ queryKey: ["aircraftUsages"], queryFn: AircraftRepo.index_aircraft_usages, ...noRefreshState });

  const validationSchema = Yup.object({
    serialNo: Yup.string().required("Serial No is required"),
    tailNo: Yup.string().required("Tail No is required"),
    registrationNo: Yup.string().required("Registration No is required"),
    aircraft_model: Yup.string().required("Aircraft Model is required"),
    aircraft_usage: Yup.string().required("Aircraft Usage is required"),
    aircraft_status: Yup.string().required("Aircraft Status is required"),
  });

  const initialValues = {
    serialNo: aircraftInfo?.serialNo || "",
    tailNo: aircraftInfo?.tailNo || "",
    registrationNo: aircraftInfo?.registrationNo || "",
    vendorId: vendorId ?? "",
    typeId: typeId ?? "",
    aircraft_model: aircraftInfo?.aircraft_model?.documentId || "",
    aircraft_usage: aircraftInfo?.aircraft_usage?.documentId || "",
    aircraft_status: aircraftInfo?.aircraft_status?.documentId || "",
  };

  useEffect(() => {
    if (aircraftInfo?.aircraft_model?.aircraft_type) {
      const type = aircraftInfo.aircraft_model.aircraft_type;
      setTypeId(type.documentId);
      const vendor = type.aircraft_manufacturer;
      setVendorId(vendor.documentId);
      setModelId(aircraftInfo.aircraft_model.documentId);
    }
  }, [aircraftInfo]);

  const handleSubmit = (values) => {
    // updateAircraft({ id: params.aircraft_id, ...values });
  };

  const removeAircraft = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently remove this aircraft.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteAircraft(params.aircraft_id);
    });
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      {isLoading && <Loader />}
      <div className="w-full p-3 flex justify-between items-center border-b border-b-gray-200">
        <Link to="/fleet" className="text-primary flex gap-2 items-center">
          <FaLongArrowAltLeft /> Back
        </Link>
        <h1 className="text-xl font-semibold">Aircraft Details</h1>
        <button className="btn btn-primary" onClick={() => setIsEdit((prev) => !prev)}>
          {isEdit ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="w-full p-3">
        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-2 border border-gray-200 p-3">
                <label>
                  Serial No <span className="text-red-500">*</span>
                </label>
                {isEdit ? <Field name="serialNo" className="my-input" /> : <p>{values.serialNo}</p>}
                <ErrorMessage name="serialNo" component="div" className="text-red-500" />
              </div>

              <div className="flex flex-col gap-2 border border-gray-200 p-3">
                <label>
                  Tail No <span className="text-red-500">*</span>
                </label>
                {isEdit ? <Field name="tailNo" className="my-input" /> : <p>{values.tailNo}</p>}
                <ErrorMessage name="tailNo" component="div" className="text-red-500" />
              </div>

              <div className="flex flex-col gap-2 border border-gray-200 p-3">
                <label>
                  Registration No <span className="text-red-500">*</span>
                </label>
                {isEdit ? <Field name="registrationNo" className="my-input" /> : <p>{values.registrationNo}</p>}
                <ErrorMessage name="registrationNo" component="div" className="text-red-500" />
              </div>

              {isEdit && (
                <>
                  <div className="flex flex-col gap-2 border border-gray-200 p-3">
                    <label>
                      Aircraft Manufacturer <span className="text-red-500">*</span>
                    </label>
                    <Field as="select" name="vendorId" className="select">
                      <option value="" hidden>
                        Select
                      </option>
                      {aircraftManufacturers?.map((m) => (
                        <option key={m.documentId} value={m.documentId}>
                          {m.name}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="flex flex-col gap-2 border border-gray-200 p-3">
                    <label>
                      Aircraft Type <span className="text-red-500">*</span>
                    </label>
                    <Field as="select" name="typeId" className="select">
                      <option value="" hidden>
                        Select
                      </option>
                      {aircraftManufacturers
                        ?.find((m) => m.documentId == values.vendorId)
                        ?.aircraft_types?.map((t) => (
                          <option key={t.documentId} value={t.documentId}>
                            {t.name}
                          </option>
                        ))}
                    </Field>
                  </div>

                  <div className="flex flex-col gap-2 border border-gray-200 p-3">
                    <label>
                      Aircraft Model <span className="text-red-500">*</span>
                    </label>
                    <Field as="select" name="aircraft_model" className="select">
                      <option value="" hidden>
                        Select
                      </option>
                      {aircraftManufacturers
                        ?.find((m) => m.documentId == values.vendorId)
                        ?.aircraft_types?.find((t) => t.documentId == values.typeId)
                        ?.aircraft_models?.map((el) => (
                          <option key={el.documentId} value={el.documentId}>
                            {el.name}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage name="aircraft_model" component="div" className="text-red-500" />
                  </div>
                </>
              )}

              <div className="flex flex-col gap-2 border border-gray-200 p-3">
                <label>
                  Aircraft Usage <span className="text-red-500">*</span>
                </label>
                {isEdit ? (
                  <Field as="select" name="aircraft_usage" className="select">
                    <option value="" hidden>
                      Select
                    </option>
                    {aircraftUsages?.map((el) => (
                      <option key={el.documentId} value={el.documentId}>
                        {el.name}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <p>{aircraftInfo?.aircraft_usage?.name}</p>
                )}
                <ErrorMessage name="aircraft_usage" component="div" className="text-red-500" />
              </div>

              <div className="flex flex-col gap-2 border border-gray-200 p-3">
                <label>
                  Aircraft Status <span className="text-red-500">*</span>
                </label>
                {isEdit ? (
                  <Field as="select" name="aircraft_status" className="select">
                    <option value="" hidden>
                      Select
                    </option>
                    {aircraftStatuses?.map((el) => (
                      <option key={el.documentId} value={el.documentId}>
                        {el.name}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <p>{aircraftInfo?.aircraft_status?.name}</p>
                )}
                <ErrorMessage name="aircraft_status" component="div" className="text-red-500" />
              </div>

              {isEdit && (
                <div className="lg:col-span-3 flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full p-3 flex justify-end">
        <button className="btn btn-error" onClick={removeAircraft}>
          Delete Aircraft
        </button>
      </div>
    </div>
  );
}
