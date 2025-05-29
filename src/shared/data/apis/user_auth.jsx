import { api } from "../../../zustand-store";

export const userAuth = async () => {
  const response = await api.post("", { query: `query Me {me {documentId email username}}` });

  let userData = response.data.data.me;
  let userId = userData.documentId;

  const featuresResponse = await api.post("", {
    query: `query UserFeatures($filters: UserFeatureFiltersInput) {
          userFeatures(filters: $filters) { documentId canCreate canUpdate canDelete system_feature { name documentId path }
          }
        }
      `,
    variables: {
      filters: {
        user: { documentId: { eq: `${userId}` } },
      },
    },
  });

  return {
    user: userData,
    features: featuresResponse.data.data.userFeatures,
  };
};
