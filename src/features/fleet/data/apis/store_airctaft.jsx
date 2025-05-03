import { api } from "../../../../zustand-store";

export const storeAircraft = async (data) => {
    return await api.post('', {
        query: `mutation CreateAircraft($data: AircraftInput!) {
            createAircraft(data: $data) {documentId}
        }`,
        variables: {
            data: { ...data }
        }
    }).then((res) => res.data.data.createAircraft);
}





