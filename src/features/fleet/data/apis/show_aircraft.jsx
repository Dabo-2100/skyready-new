import { api } from "../../../../zustand-store";

export const showAircraft = async ($documentId) => {
  return await api.post('', {
    query: `query Aircraft($documentId: ID!) {
          aircraft(documentId: $documentId) {
            documentId serialNo registrationNo tailNo
            aircraft_model {documentId name}
            aircraft_status {documentId name bgColor }
            aircraft_usage {documentId name}
          }
        }`,
    variables: { "documentId": $documentId }
  }).then((res) => res.data.data.aircraft);
}

