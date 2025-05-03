import { api } from "../../../../zustand-store";

export const indexAircraftTypes = async () => {
    return await api.post('', {
        query: `query AircraftTypes {
            aircraftTypes {name documentId aircraft_manufacturer {name documentId}} 
        }`,
        variables: {
            "sort": ["name"],
            "pagination": {
                "page": 1,
                "pageSize": 10000
            }
        }
    }).then((res) => res.data.data.aircraftTypes);
}

