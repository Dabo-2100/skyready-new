import { api } from "../../../../zustand-store";

export const indexAircraftModels = async (activePage = 1) => {
  return await api
    .post("", {
      query: `query AircraftModels($sort: [String], $pagination: PaginationArg) {
              aircraftModels(sort: $sort, pagination: $pagination) {
                documentId name
                manufacturer { documentId name }
              }
            aircraftModels_connection {pageInfo {total}}
          }`,
      variables: {
        sort: ["manufacturer.name", "name"],
        pagination: {
          page: activePage == 0 ? 1 : activePage,
          pageSize: activePage == 0 ? 10000 : 25,
        },
      },
    })
    .then((res) => {
      return { records: res.data.data.aircraftModels, total: res.data.data.aircraftModels_connection.pageInfo.total };
    });
};
