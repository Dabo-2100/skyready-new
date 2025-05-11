import { api } from "../../../../zustand-store";

export const updateAircraftManufacturer = async (id, data) => {
  console.log(id, { name: data.name, country: data.country });
  return await api
    .post("", {
      query: `mutation UpdateAircraftManufacturer($documentId: ID!, $data: AircraftManufacturerInput!) {
        updateAircraftManufacturer(documentId: $documentId, data: $data) { documentId name country }
        }`,
      variables: {
        documentId: id,
        data: { name: data.name, country: data.country },
      },
    })
    .then((res) => {
      return { ...res.data.data.updateAircraftManufacturer };
    });
};
