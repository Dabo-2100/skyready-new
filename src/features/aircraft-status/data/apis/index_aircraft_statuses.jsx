import { api } from "../../../../zustand-store";

export const indexAircraftStatuses = async (activePage) => {
  return await api
    .post("", {
      query: `query AircraftStatuses($sort: [String], $pagination: PaginationArg) {
        aircraftStatuses(sort: $sort, pagination: $pagination) { documentId name style }
        aircraftStatuses_connection {pageInfo {total}}}`,
      variables: {
        pagination: {
          page: activePage == 0 ? 1 : activePage,
          pageSize: activePage == 0 ? 10000 : 25,
        },
        sort: ["name"],
      },
    })
    .then((res) => {
      return { records: res.data.data.aircraftStatuses, total: res.data.data.aircraftStatuses_connection.pageInfo.total };
    });
};
