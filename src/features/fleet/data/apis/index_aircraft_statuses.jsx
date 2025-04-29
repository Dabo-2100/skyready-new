import { api } from "../../../../zustand-store";

export const indexAircraftStatuses = async () => {
    return await api.post('', {
        query: `query AircraftStatuses {
            aircraftStatuses {documentId name bgColor}
        }`,
        variables: {
            "sort": ["name"],
            "pagination": {
                "page": 1,
                "pageSize": 10000
            }
        }
    }).then((res) => res.data.data.aircraftStatuses);
}

