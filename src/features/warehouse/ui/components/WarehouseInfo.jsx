import { useState } from "react";
import { FaWarehouse } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
export default function WarehouseInfo({ warehouseInfo, currentUser }) {
  const [isEdit] = useState(false);
  return (
    <div className="w-full flex flex-col bg-white rounded shadow p-3">
      <div className="w-full flex items-center justify-between pb-4">
        <h1 className="text-xl font-semibold rounded-t-2xl">
          {warehouseInfo?.name} ({warehouseInfo?.avenue})
        </h1>
        {warehouseInfo?.warehouse_manager?.documentId == currentUser && <button className="btn btn-primary">{!isEdit ? "Edit Warehouse" : "Save Changes"}</button>}
      </div>
      <div className="w-full flex flex-col">
        <h1 className="w-full bg-slate-200 p-3 rounded-t font-semibold border border-slate-400/50">General Information</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3 border border-slate-200">
        <div className="flex gap-2 items-center">
          <FaWarehouse /> Warehouse Name :{isEdit ? <input className="my-input" /> : <p>{warehouseInfo?.name}</p>}
        </div>
        <div className="flex gap-2 items-center">
          <IoLocationOutline /> Location :{isEdit ? <input className="my-input" /> : <p>{warehouseInfo?.avenue}</p>}
        </div>
        <div className="flex gap-2 items-center">
          <FaRegUser /> Manager :{isEdit ? <input className="my-input" /> : <p>{warehouseInfo?.warehouse_manager?.username}</p>}
        </div>
        <div className="flex gap-2 items-center">
          <FaRegUser /> Created At :{isEdit ? <input className="my-input" /> : <p>{warehouseInfo?.createdAt?.split("T")[0]}</p>}
        </div>
      </div>
    </div>
  );
}
