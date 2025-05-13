import { api } from "../../../../zustand-store";

export const deleteAircraft = async (documentId) => {
  return await api
    .post("", {
      query: `mutation DeleteAircraft($documentId: ID!) {
            deleteAircraft(documentId: $documentId) {documentId}
        }`,
      variables: {
        documentId: documentId,
      },
    })
    .then((res) => {
      return { ...res.data.data.deleteAircraft };
    });
};
