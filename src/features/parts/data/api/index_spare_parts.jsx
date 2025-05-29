import { api } from "../../../../zustand-store";

export const indexSpareParts = async (activePage = 1) => {
  return await api
    .post("", {
      query: `
            query AircraftParts($pagination: PaginationArg) {
            aircraftParts(pagination: $pagination) { 
                documentId description partNo isSerialized
                ata_chapter { documentId name }
                aircraft_part_category { documentId name }
            }
            aircraftParts_connection {pageInfo {total}}}
        `,
      variables: {
        pagination: {
          page: activePage,
          pageSize: 25,
        },
        sort: ["partNo", "aircraft_part_category.name"],
      },
    })
    .then((res) => {
      return { records: res.data.data.aircraftParts, total: res.data.data.aircraftParts_connection.pageInfo.total };
    });
};
