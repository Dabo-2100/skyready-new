import { AuthService } from "../../../services/authService";
import { api } from "../../../zustand-store";

export const userLogin = async ({ identifier, password, rememberIndex }) => {
  try {
    const res = await api.post("", {
      query: `
        mutation Login($input: UsersPermissionsLoginInput!) {
          login(input: $input) { jwt user { documentId email username }}
        }
      `,
      variables: {
        input: { identifier, password },
      },
    });

    const loginData = res?.data?.data?.login;
    const loginError = res?.data?.errors;

    if (loginError || !loginData) {
      throw new Error(loginError?.[0]?.message || "Login failed");
    }

    AuthService.setToken(loginData.jwt, rememberIndex);

    const featuresResponse = await api.post("", {
      query: `query UserFeatures($filters: UserFeatureFiltersInput) {
          userFeatures(filters: $filters) {
            documentId canCreate canUpdate canDelete
            system_feature { name documentId path }
          }
        }
      `,
      variables: {
        filters: {
          user: { documentId: { eq: `${loginData.user.documentId}` } },
        },
      },
    });

    return {
      user: loginData.user,
      features: featuresResponse.data.data.userFeatures,
    };
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
