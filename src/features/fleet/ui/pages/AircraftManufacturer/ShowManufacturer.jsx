import { useParams, useNavigate } from "react-router-dom";
import { AircraftRepo } from "../../../data/AircraftRepo";
import { useQuery } from "@tanstack/react-query";
import { noRefreshState } from "../../../../../zustand-store";
import Loader from "../../../../../shared/ui/components/Loader";
import { FaLongArrowAltLeft } from "react-icons/fa";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useUpdateManufacturer from "../../hooks/useUpdateManufacturer";
import useDeleteManufacturer from "../../hooks/useDeleteManufacturer";
import Swal from "sweetalert2";
export default function ShowManufacturer() {
  const navigate = useNavigate();
  const { manufacturer_id } = useParams();
  const { mutate: updateManufacturer, isLoading: isUpdatingManufacturer } = useUpdateManufacturer();
  const { data: aircraftManufacturers, isLoading: isLoadingManufacturers } = useQuery({ queryKey: ["aircraftManufacturers"], queryFn: () => AircraftRepo.index_aircraft_manudacturers(), ...noRefreshState });
  const { data: manufacturer, isLoading: isLoadingManufacturer } = useQuery({ queryKey: ["manufacturer", manufacturer_id], queryFn: () => AircraftRepo.show_aircraft_manufacturer(manufacturer_id), ...noRefreshState });
  const { mutate: deleteManufacturer } = useDeleteManufacturer();

  const initialValues = { name: manufacturer?.name || "", country: manufacturer?.country || "" };
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
    updateManufacturer({ ...values, documentId: manufacturer_id });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteManufacturer(manufacturer_id);
      }
    });
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      {(isLoadingManufacturers || isLoadingManufacturer || isUpdatingManufacturer) && <Loader />}
      <div className="flex flex-col p-4">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
          <Form>
            <div className="flex w-full justify-between items-center">
              <button className="btn btn-soft btn-primary" onClick={() => navigate(-1)}>
                <FaLongArrowAltLeft className="text-primary flex items-center gap-2" /> Back
              </button>
              <h1 className="text-lg font-bold">Manufacturer Details</h1>
              <button className="btn btn-soft btn-primary" type="submit">
                Save Changes
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <h1 className="text-lg font-bold">Manufacturer Name</h1>
                <Field className="input w-full" name="name" type="text" placeholder="Manufacturer Name" />
                <ErrorMessage name="name" className="text-red-500" component="div" />
              </div>
              <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <h1 className="text-lg font-bold">Country</h1>
                <Field className="input w-full" name="country" type="text" placeholder="Country" />
                <ErrorMessage name="country" className="text-red-500" component="div" />
              </div>
            </div>
            {manufacturer?.aircraft_types?.length > 0 && (
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-lg font-bold">Aircraft Types</h1>
                <div className="flex flex-col gap-2 bg-base-100 p-4 rounded-box">
                  {manufacturer?.aircraft_types?.map((type) => (
                    <div key={type.documentId} className="flex flex-col gap-2">
                      <h1 className="text-lg font-bold">{type.name}</h1>
                      <div className="flex flex-col gap-2">
                        {type.aircraft_models?.map((model) => (
                          <div key={model.documentId} className="flex flex-col gap-2">
                            <h1 className="text-lg font-bold">{model.name}</h1>
                            <table className="table table-xs">
                              <thead>
                                <tr>
                                  <th>Tail No</th>
                                  <th>Serial No</th>
                                  <th>Registration No</th>
                                  <th>Status</th>
                                  <th>Usage</th>
                                </tr>
                              </thead>
                              <tbody>
                                {model.aircraft?.map((aircraft) => (
                                  <tr onClick={() => navigate(`/fleet/aircraft/${aircraft.documentId}`)} className="hover:bg-base-300 cursor-pointer" key={aircraft.documentId}>
                                    <td>{aircraft.tailNo}</td>
                                    <td>{aircraft.serialNo}</td>
                                    <td>{aircraft.registrationNo}</td>
                                    <td>{aircraft.aircraft_status.name}</td>
                                    <td>{aircraft.aircraft_usage.name}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-4">
              <button className="btn btn-soft btn-error" onClick={handleDelete}>
                Delete Manufacturer
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
