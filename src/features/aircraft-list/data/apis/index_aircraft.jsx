import { api } from "../../../../zustand-store";

export const indexAircraft = async (activePage = 1) => {
  return await api
    .post("", {
      query: `
          query Aircrafts($pagination: PaginationArg, $sort: [String], $filters: AircraftFiltersInput) {
            aircrafts(pagination: $pagination, sort: $sort, filters: $filters) {
              documentId serialNo tailNo customerNo
              aircraft_model { documentId name manufacturer { name documentId country }}
              aircraft_usage { documentId name}
              aircraft_status { documentId name style }
            }
            aircrafts_connection {pageInfo {total}}
          }
      `,
      variables: {
        pagination: {
          page: activePage == 0 ? 1 : activePage,
          pageSize: activePage == 0 ? 10000 : 25,
        },
        sort: ["aircraft_model.name", "serialNo"],
        filters: {
          // serialNo: { contains: null },
          // tailNo: { contains: null },
          // aircraft_model: { name: { contains: null } },
        },
      },
    })
    .then((res) => {
      return { records: res.data.data.aircrafts, total: res.data.data.aircrafts_connection.pageInfo.total };
    });
};
