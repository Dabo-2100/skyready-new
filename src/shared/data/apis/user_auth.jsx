import { api } from "../../../zustand-store";

export const userAuth = async () => {
  const response = await api.post("", {
    query: `query Me {me {documentId email username}}`,
  });
  return response.data.data.me;
};
