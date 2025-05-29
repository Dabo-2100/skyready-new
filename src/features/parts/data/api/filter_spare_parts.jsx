import { api } from "../../../../zustand-store";

export const filterSpareParts = async (filterType, searchValue, activePage) => {
  return await api
    .post("", {
      query: `
            query AircraftParts($pagination: PaginationArg , $filters: AircraftPartFiltersInput) {
            aircraftParts(pagination: $pagination , filters: $filters) { 
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
        filters: {
          [filterType]: { contains: searchValue },
        },
        sort: ["partNo", "aircraft_part_category.name"],
      },
    })
    .then((res) => {
      return { records: res.data.data.aircraftParts, total: res.data.data.aircraftParts_connection.pageInfo.total };
    });
};
