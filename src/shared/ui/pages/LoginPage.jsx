import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "../../validators/LoginSchema";
import { motion } from "motion/react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useQuery } from "@tanstack/react-query";
import { UserRepo } from "../../data/UserRepo";
import Loader from "../components/Loader";
import { AuthService } from "../../../services/authService";
import { noRefreshState } from "../../../zustand-store";
import logo from "../../../assets/skyready-dark.svg";
export default function LoginPage() {
  const navigate = useNavigate();
  // Query
  const { data: userInfo, isLoading } = useQuery({ queryKey: ["userInfo"], queryFn: UserRepo.user_auth, enabled: !!AuthService.getToken(), ...noRefreshState, retry: false });

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const intialValues = { identifier: "", password: "", rememberIndex: false };

  // Mutation
  const { mutate: login, isLoading: isLoginLoading } = useLogin();

  const pageStyle = useMemo(() => clsx("w-full h-full overflow-auto", "flex justify-center", "items-start md:items-center", "pt-5 md:pt-0"), []);
  const formStyle = useMemo(() => clsx("w-[90%] md:w-100", "flex flex-col gap-3", "py-5 px-7 rounded-xl", "bg-white shadow-lg shadow-[var(--color-text)]"), []);

  useEffect(() => {
    !isLoading && userInfo && navigate("/");
  }, [navigate, userInfo, isLoading]);

  return (
    <div className={pageStyle}>
      {isLoginLoading && <Loader />}
      {!isLoading && (
        <Formik initialValues={intialValues} validationSchema={LoginSchema} onSubmit={login}>
          <motion.div className={formStyle} initial={{ opacity: 0, y: "-100vh" }} animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}>
            <Form>
              <div className="w-full flex flex-col items-center">
                <img src={logo} alt="logo" className="w-40 mb-5" />
                <h1 className="text-3xl font-bold text-left w-full ext-[var(--color-text)] mb-4">Log in</h1>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Email address</label>
                  <Field type="text" name="identifier" className="my-input w-full" placeholder="Enter your username here ..." autoComplete="email" />
                  <ErrorMessage name="identifier" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex flex-col gap-1 relative">
                  <label className="text-sm">Password</label>
                  <div className=" relative w-full">
                    <Field type={showPassword ? "text" : "password"} name="password" className="my-input w-full" placeholder="Enter your email here ..." autoComplete="current-password" />
                    <div className="absolute top-3 right-3 cursor-pointer z-50" onClick={togglePassword}>
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </div>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="w-full flex justify-between flex-wrap">
                  <label className="label">
                    <Field type="checkbox" name="rememberIndex" className="checkbox checkbox-primary border-[#004AAD]" />
                    Remember me
                  </label>

                  <Link to="/forget" className="label text-sm text-blue-600 hover:underline">
                    Forget Password ?
                  </Link>
                </div>

                <button disabled={isLoginLoading} className="btn btn-primary bg-[#004AAD]  text-white w-full text-md " type="submit">
                  Log in
                </button>
              </div>
            </Form>
          </motion.div>
        </Formik>
      )}
    </div>
  );
}
