import { api } from "../../../../zustand-store";

export const indexAircraftUsages = async () => {
    return await api.post('', {
        query: `query AircraftUsages {
            aircraftUsages {
                documentId name
            }
        }`,
        variables: {
            "sort": ["name"],
            "pagination": {
                "page": 1,
                "pageSize": 10000
            }
        }
    }).then((res) => res.data.data.aircraftUsages);
}

