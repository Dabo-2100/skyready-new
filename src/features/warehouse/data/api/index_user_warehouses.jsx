import { api } from "../../../../zustand-store";

export const indexUserWarehouses = async (user_documentId) => {
  return await api
    .post("", {
      query: `
      query WarehouseUserRoles($filters: WarehouseUserRoleFiltersInput) {
        warehouseUserRoles(filters: $filters) {
            documentId
            role
            warehouse { isVirtual name documentId isActive
            warehouse_manager {username}
        }}}
        `,
      variables: {
        filters: {
          users_permissions_user: { documentId: { eq: user_documentId } },
        },
        sort: ["warehouse.name"],
      },
    })
    .then((res) => {
      return res.data.data.warehouseUserRoles;
    });
};
