import lightLogo from "@/assets/skyready-white.svg";
import { Link } from "react-router-dom";

export default function LogoBlock() {
  return (
    <div className="w-full pt-5 pb-2 justify-center hidden md:flex">
      <Link to="/">
        <img className="w-30" src={lightLogo} alt="Skyready Logo" />
      </Link>
    </div>
  );
}
