import { api } from "../../../../zustand-store";

export const deleteAircraftManufacturer = async (documentId) => {
  return await api
    .post("", {
      query: `mutation DeleteAircraftManufacturer($documentId: ID!) {
            deleteAircraftManufacturer(documentId: $documentId) {documentId}
        }`,
      variables: {
        documentId: documentId,
      },
    })
    .then((res) => {
      return { ...res.data.data.deleteAircraftManufacturer };
    });
};
