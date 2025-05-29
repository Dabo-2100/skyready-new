import { api } from "../../../../zustand-store";

export const storeAircraftModel = async (data) => {
  return await api
    .post("", {
      query: `mutation CreateAircraftModel($data: AircraftModelInput!) {
        createAircraftModel(data: $data) {documentId name manufacturer {documentId name}}}`,
      variables: { data: { ...data } },
    })
    .then((res) => {
      return { ...res.data.data.createAircraftModel, ...data };
    });
};
