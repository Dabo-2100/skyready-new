import { indexUserWarehouses } from "./api/index_user_warehouses";
import { showWarehouse } from "./api/show_warehouse";

export const WarehouseRepo = {
  index_user_warehouses: async (user_id) => await indexUserWarehouses(user_id),
  warehouse_details: async (warehouse_id) => await showWarehouse(warehouse_id),
};
