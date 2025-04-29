import { api } from "../../../../zustand-store";

export const indexAircraftModels = async () => {
    return await api.post('', {
        query: `query AircraftModels($sort: [String], $pagination: PaginationArg) {
            aircraftModels(sort: $sort, pagination: $pagination) {
            documentId name
                aircraft_type {
                    documentId name
                    aircraft_manufacturer {documentId name}
                }
            }
        }`,
        variables: {
            "sort": ["aircraft_type.name", "name"],
            "pagination": {
                "page": 1,
                "pageSize": 10000
            }
        }
    }).then((res) => res.data.data.aircraftModels);
}

