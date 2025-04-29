import clsx from "clsx"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "../../validators/LoginSchema";
import { motion } from "motion/react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useQuery } from "@tanstack/react-query";
import { UserRepo } from "../../data/UserRepo";
import Loader from "../components/Loader";

export default function LoginPage() {
    const navigate = useNavigate();
    const { data: userInfo, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: UserRepo.user_auth });
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(prev => !prev);
    const intialValues = { email: "", password: "", rememberIndex: false };
    const { mutate: login } = useLogin();
    const handleLogin = (values) => { login({ ...values }) };

    const pageStyle = clsx(
        "w-full h-full overflow-auto",
        "flex justify-center",
        "items-start md:items-center",
        "pt-5 md:pt-0"
    );

    const formStyle = clsx(
        "w-[90%] md:w-100",
        "flex flex-col gap-3",
        "py-5 px-4 rounded-lg",
        "bg-slate-300 dark:bg-black/30"
    );

    useEffect(() => { !isLoading && userInfo && navigate('/') }, [isLoading, userInfo])

    return (
        <div className={pageStyle}>
            {isLoading && <Loader />}
            <Formik initialValues={intialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
                <motion.div className={formStyle} initial={{ opacity: 0, y: "-100vh" }} animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}>
                    <Form >
                        <div><h1 className="text-lg text-center w-full">Welcome Back , Please Login</h1></div>

                        <div className="flex flex-col gap-3">

                            <div className="flex flex-col gap-1">
                                <label className="text-sm">Email</label>
                                <Field type="text" name="email" className="input w-full" placeholder="Enter your email here ..." autoComplete="email" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col gap-1 relative">
                                <label className="text-sm">Password</label>
                                <div className=" relative w-full">
                                    <Field type={showPassword ? "text" : "password"} name="password" className="input w-full" placeholder="Enter your email here ..." autoComplete="current-password" />
                                    <div className="absolute top-3 right-3 cursor-pointer z-50" onClick={togglePassword}>
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </div>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="w-full flex justify-between flex-wrap">
                                <label className="label">
                                    <Field type="checkbox" name="rememberIndex" className="checkbox checkbox-primary" />
                                    Remember me
                                </label>

                                <Link to="/forget" className="label text-sm">Forget Password ?</Link>
                            </div>

                            <button className="btn btn-primary w-full">Login</button>
                        </div>
                    </Form>
                </motion.div>
            </Formik>
        </div>
    )
}
