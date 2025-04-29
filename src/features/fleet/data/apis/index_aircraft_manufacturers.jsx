import { api } from "../../../../zustand-store";

export const indexAircraftManudacturers = async () => {
    return await api.post('', {
        query: `query ExampleQuery($pagination: PaginationArg, $sort: [String]) {
            aircraftManufacturers(sort: $sort) {documentId name country
                aircraft_types {documentId name
                aircraft_models(pagination: $pagination) {documentId name}
                }
            }
        }`,
        variables: {
            "sort": ["name"],
            "pagination": {
                "page": 1,
                "pageSize": 10000
            }
        }
    }).then((res) => res.data.data.aircraftManufacturers);
}

