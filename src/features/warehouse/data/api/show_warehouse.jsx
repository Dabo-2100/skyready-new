import { api } from "../../../../zustand-store";

export const showWarehouse = async (warehouse_id) => {
  return await api
    .post("", {
      query: `query Warehouse($documentId: ID!) {
      warehouse(documentId: $documentId) {
            documentId name isActive isVirtual avenue createdAt
            warehouse_locations {name}
            warehouse_manager {username documentId}
        }}
    `,
      variables: { documentId: warehouse_id },
    })
    .then((res) => {
      return res.data.data.warehouse;
    });
};
