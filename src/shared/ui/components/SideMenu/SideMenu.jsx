import clsx from "clsx";
import LogoBlock from "./LogoBlock";
import NavBlock from "./NavBlock";
import { useMemo } from "react";

export default function SideMenu() {
  const menuStyle = useMemo(() => clsx("h-auto md:h-full", "w-full md:w-[250px]", "bg-[#062768] text-[#effcff]", "order-2 md:order-1", "p-0", "flex flex-row md:flex-col", "border-t border-t-slate-100/20 md:border-r md:border-r-slate-100/20"), []);
  return (
    <div className={menuStyle}>
      <LogoBlock />
      <NavBlock />
    </div>
  );
}
