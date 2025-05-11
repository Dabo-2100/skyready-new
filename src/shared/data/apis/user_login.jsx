import { api } from "../../../zustand-store";

export const userLogin = async (identifier, password) => {
  const loginResponse = await api.post("", {
    query: `mutation Login($input: UsersPermissionsLoginInput!) {
            login(input: $input) {jwt user {documentId email username}}
        }`,
    variables: {
      input: { identifier, password },
    },
  });

  const loginData = loginResponse.data.data.login;
  sessionStorage.setItem("token", loginData.jwt);

  // Get user features query
  const featuresResponse = await api.post("", {
    query: `query ExampleQuery($filters: UserFeatureFiltersInput) {
          userFeatures(filters: $filters) {
            feature {name documentId}}}
        `,
    variables: {
      filters: {
        user: { documentId: { eq: loginData.user.documentId } },
        feature: { isActive: { eq: true } },
      },
    },
  });

  return {
    userInfo: loginData,
    features: featuresResponse.data.data.userFeatures,
  };
};
