import { api } from "../../../../zustand-store";

export const showAircraftManufacturer = async ($documentId) => {
  return await api
    .post("", {
      query: `query AircraftManufacturer($documentId: ID!) {
        aircraftManufacturer(documentId: $documentId) {
            name
            country
            aircraft_types {name documentId
            aircraft_models {documentId name
            aircraft {
                  tailNo
                  serialNo
                  registrationNo
                  documentId
                  aircraft_usage {name}
                  aircraft_status {name}
                }
            }
            }}
        }`,
      variables: { documentId: $documentId },
    })
    .then((res) => res.data.data.aircraftManufacturer);
};
