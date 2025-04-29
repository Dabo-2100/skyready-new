import { useQuery } from "@tanstack/react-query";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { AircraftRepo } from "../../data/AircraftRepo";
import { Field, Form, Formik } from "formik";
import { AircraftSchema } from "../validators/AircraftSchema";
import { useEffect, useState } from "react";
import Loader from "../../../../shared/ui/components/Loader";

export default function AircraftDetails() {
    const [intialValues, setIntialValue] = useState({ serialNo: "", tailNo: "", registrationNo: "" });
    const [isEdit, setIsEdit] = useState(false);
    const params = useParams()
    const { data: aircraftInfo, isLoading } = useQuery({ queryKey: ['aircraftInfo'], queryFn: () => AircraftRepo.show_aircraft(params.aircraft_id) })
    useEffect(() => {
        setIntialValue({
            serialNo: aircraftInfo?.serialNo,
            tailNo: aircraftInfo?.tailNo,
            registrationNo: aircraftInfo?.registrationNo,
        });
    }, [aircraftInfo]);
    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            {isLoading && <Loader />}
            <div className="w-full p-3 flex justify-between items-center border-b border-b-slate-50/20">
                <Link to="../" className="text-primary flex gap-2 items-center"><FaLongArrowAltLeft />Back</Link>
                <h1 className="text-xl">Aircraft Details</h1>
                <button className="btn btn-soft btn-primary" onClick={() => setIsEdit(prev => !prev)}>Edit</button>
            </div>
            <div className="w-full flex grow overflow-auto">
                <div className="w-full flex flex-col border-b border-b-slate-50/20 p-3">
                    <h1 className="bg-indigo-800/50 p-3 text-lg border border-slate-50/20 mb-1">Basic Info</h1>
                    <Formik enableReinitialize initialValues={intialValues}>
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-slate-50/20">
                                <div className="p-2 flex items-center border border-slate-50/20">
                                    <label htmlFor="">Serial No <b className="text-red-500">*</b> : </label>
                                    {
                                        !isEdit ?
                                            <p className="p-2">{aircraftInfo?.serialNo}</p> :
                                            <Field name="serialNo" className="input w-full" placeholder="Serial No *" />
                                    }
                                </div>
                                <div className="p-2 flex items-center border border-slate-50/20">
                                    <label htmlFor="">Tail No <b className="text-red-500">*</b> : </label>
                                    {
                                        !isEdit ?
                                            <p className="p-2">{aircraftInfo?.tailNo}</p> :
                                            <Field name="tailNo" className="input w-full" placeholder="Tail No *" />
                                    }
                                </div>
                                <div className="p-2 flex items-center border border-slate-50/20">
                                    <label htmlFor="">Serial No <b className="text-red-500">*</b></label>
                                    {
                                        !isEdit ?
                                            <p className="p-2">{aircraftInfo?.serialNo}</p> :
                                            <Field name="serialNo" className="input w-full" placeholder="Serial No *" />
                                    }
                                </div>
                                <div className="p-2 flex items-center border border-slate-50/20">
                                    <label htmlFor="">Serial No <b className="text-red-500">*</b></label>
                                    {
                                        !isEdit ?
                                            <p className="p-2">{aircraftInfo?.serialNo}</p> :
                                            <Field name="serialNo" className="input w-full" placeholder="Serial No *" />
                                    }
                                </div>
                            </div>
                        </Form>
                    </Formik>

                </div>
            </div>

        </div>
    )
}
