import { useTheme } from "../../../../zustand-store";
import darkLogo from "@/assets/skyready-dark.svg"
import lightLogo from "@/assets/skyready-white.svg"
import { Link } from "react-router-dom";

export default function LogoBlock() {
    const { isDark } = useTheme();
    return (
        <div className="w-full py-5 justify-center border-b border-b-slate-100/20 hidden md:flex">
            <Link to="/"><img className="w-30" src={isDark ? lightLogo : darkLogo} alt="Skyready Logo" /></Link>
        </div>
    )
}
