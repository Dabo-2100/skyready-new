import { api } from "../../../../zustand-store";

export const indexAircraftUsages = async (activePage) => {
  return await api
    .post("", {
      query: `query AircraftUsages($pagination: PaginationArg, $sort: [String]) {
        aircraftUsages(pagination: $pagination, sort: $sort) {documentId name}
        aircraftUsages_connection {pageInfo {total}}
      }`,
      variables: {
        pagination: {
          page: activePage == 0 ? 1 : activePage,
          pageSize: activePage == 0 ? 10000 : 25,
        },
        sort: ["name"],
      },
    })
    .then((res) => {
      return { records: res.data.data.aircraftUsages, total: res.data.data.aircraftUsages_connection.pageInfo.total };
    });
};
