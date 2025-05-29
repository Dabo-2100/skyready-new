import { api } from "../../../../zustand-store";

export const indexAircraftManudacturers = async (activePage) => {
  return await api
    .post("", {
      query: `query Manufacturers($sort: [String], $pagination: PaginationArg) {
      manufacturers(sort: $sort, pagination: $pagination) {documentId name country aircraft_models {name documentId}}
      manufacturers_connection {pageInfo {total}}
    }`,
      variables: {
        sort: ["name"],
        pagination: {
          page: activePage == 0 ? 1 : activePage,
          pageSize: activePage == 0 ? 10000 : 25,
        },
      },
    })
    .then((res) => {
      return { records: res.data.data.manufacturers, total: res.data.data.manufacturers_connection.pageInfo.total };
    });
};
