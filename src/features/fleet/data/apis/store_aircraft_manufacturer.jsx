import { api } from "../../../../zustand-store";

export const storeAircraftManufacturer = async (data) => {
  return await api
    .post("", {
      query: `mutation CreateAircraftManufacturer($data: AircraftManufacturerInput!) {
            createAircraftManufacturer(data: $data) {documentId}
        }`,
      variables: {
        data: { ...data },
      },
    })
    .then((res) => {
      return { ...res.data.data.createAircraftManufacturer, ...data };
    });
};
