import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../shared/ui/components/Loader";
import { AircraftRepo } from "../../data/AircraftRepo";
import { noRefreshState } from "../../../../zustand-store";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
export default function NewAircraft() {
    // State
    const [aircraftList, setAircraftList] = useState([]);
    const [modelId, setModelId] = useState(null);

    // Queries
    const { data: aircraftListData } = useQuery({ enabled: !!modelId, queryKey: ['aircraftList', modelId], queryFn: () => AircraftRepo.index_aircraft(1, modelId), ...noRefreshState });
    const { data: aircraftStatuses } = useQuery({ queryKey: ['aircraftStatuses'], queryFn: AircraftRepo.index_aircraft_statuses, ...noRefreshState });
    const { data: aircraftUsages } = useQuery({ queryKey: ['aircraftUsages'], queryFn: AircraftRepo.index_aircraft_usages, ...noRefreshState });
    const { data: aircraftManufacturers, isLoading } = useQuery({ queryKey: ['aircraftManufacturers'], queryFn: AircraftRepo.index_aircraft_manudacturers, ...noRefreshState });

    // Formik
    const initialValues = { serialNo: "", tailNo: "", RegistrationNo: "", aircraft_usage: "", aircraft_status: "", aircraft_model: -1, vendorId: -1, typeId: -1 }
    const validationSchema = Yup.object({
        serialNo: Yup.string().required('Serial No is required').notOneOf(aircraftList?.map(el => el.serialNo) || [], 'Serial No already exists'),
        tailNo: Yup.string().required('Tail No is required').notOneOf(aircraftList?.map(el => el.tailNo) || [], 'Tail No already exists'),
        RegistrationNo: Yup.string().required('Registration No is required').notOneOf(aircraftList?.map(el => el.registrationNo) || [], 'Registration No already exists'),
        aircraft_model: Yup.string().required('Aircraft Model is required'),
        aircraft_usage: Yup.string().required('Aircraft Usage is required'),
        aircraft_status: Yup.string().required('Aircraft Status is required'),
    });

    // Handlers
    const handleSubmit = () => { console.log('Hello There') }

    // Effects
    useEffect(() => { setAircraftList(aircraftListData) }, [aircraftListData]);
    return (
        <div className="flex flex-col w-full h-full">
            {isLoading && <Loader />}
            <div className="w-full p-3 flex items-center justify-between gap-3 border-b border-b-slate-50/20">
                <Link to="../" className="text-primary flex items-center gap-2"><FaLongArrowAltLeft /> Back</Link>
                <h1 className="badge badge-soft badge-info h-auto font-bold py-3">Add New Aircraft to fleet</h1>
                <button className="btn btn-soft btn-primary">Save</button>
            </div>
            <div className="w-full grow p-3 overflow-auto">
                <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                    {
                        ({ values }) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks  
                            useEffect(() => {
                                if (values?.aircraft_model && values.aircraft_model !== -1) { setModelId(values.aircraft_model) }
                            }, [values.aircraft_model]);
                            return (
                                <div className="bg-black/30 rounded p-3 w-full">
                                    <Form className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:col-span-2 lg:col-span-3">
                                            <div className="flex flex-col gap-2">
                                                <label>Manufacturer<span className="text-red-500">*</span></label>
                                                <Field as="select" name="vendorId" className="select w-full">
                                                    <option value={-1} hidden>Select Manufacturer</option>
                                                    {
                                                        aircraftManufacturers?.map((el, index) => (
                                                            <option key={el.documentId} value={index}>{el.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <ErrorMessage name="vendorId" component={"div"} className="text-red-500" />
                                            </div>

                                            {values?.vendorId != -1 && <div className="flex flex-col gap-2">
                                                <label>Aircraft Type<span className="text-red-500">*</span></label>
                                                <Field as="select" name="typeId" className="select w-full">
                                                    <option value={-1} hidden>Select Aircraft Type</option>
                                                    {
                                                        aircraftManufacturers[values.vendorId]?.aircraft_types?.map((el, index) => (
                                                            <option key={el.documentId} value={index}>{el.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <ErrorMessage name="typeId" component={"div"} className="text-red-500" />
                                            </div>}


                                            {values?.typeId != -1 && <div className="flex flex-col gap-2">
                                                <label>Aircraft Model<span className="text-red-500">*</span></label>
                                                <Field as="select" name="aircraft_model" className="select w-full">
                                                    <option value={-1} hidden>Select Aircraft Model</option>
                                                    {
                                                        aircraftManufacturers[values.vendorId]?.aircraft_types[values.typeId]?.aircraft_models?.map((el) => (
                                                            <option key={el.documentId} value={el.documentId}>{el.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <ErrorMessage name="aircraft_model" component={"div"} className="text-red-500" />
                                            </div>}
                                        </div>

                                        {
                                            values?.aircraft_model != -1 &&
                                            <>
                                                <div className="flex flex-col gap-2">
                                                    <label>Serial No <span className="text-red-500">*</span></label>
                                                    <Field name="serialNo" className="input w-full" placeholder="Enter serial no ..." type="text" />
                                                    <ErrorMessage name="serialNo" component={"div"} className="text-red-500" />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label>Registration No<span className="text-red-500">*</span></label>
                                                    <Field name="RegistrationNo" className="input w-full" placeholder="Enter registeraion no ..." type="text" />
                                                    <ErrorMessage name="RegistrationNo" component={"div"} className="text-red-500" />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label>Tail No<span className="text-red-500">*</span></label>
                                                    <Field name="tailNo" className="input w-full" placeholder="Enter tail no ..." type="text" />
                                                    <ErrorMessage name="tailNo" component={"div"} className="text-red-500" />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label>Aircraft Usage<span className="text-red-500">*</span></label>
                                                    <Field as="select" name="aircraft_usage" className="select w-full">
                                                        <option value={-1} hidden>Select Aircraft Usage</option>
                                                        {
                                                            aircraftUsages?.map((el) => (
                                                                <option key={el.documentId} value={el.documentId}>{el.name}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="aircraft_usage" component={"div"} className="text-red-500" />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label>Aircraft Status<span className="text-red-500">*</span></label>
                                                    <Field as="select" name="aircraft_status" className="select w-full">
                                                        <option value={-1} hidden>Select Aircraft Usage</option>
                                                        {
                                                            aircraftStatuses?.map((el) => (
                                                                <option key={el.documentId} value={el.documentId}>{el.name}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="aircraft_status" component={"div"} className="text-red-500" />
                                                </div>
                                            </>
                                        }
                                    </Form>
                                </div>
                            )
                        }
                    }
                </Formik>
            </div>
        </div>
    )
}