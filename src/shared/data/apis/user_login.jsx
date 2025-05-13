import { AuthService } from "../../../services/authService";
import { api } from "../../../zustand-store";

export const userLogin = async ({ identifier, password, rememberIndex }) => {
  try {
    const res = await api.post("", {
      query: `
        mutation Login($input: UsersPermissionsLoginInput!) {
          login(input: $input) {
            jwt
            user {
              documentId
              email
              username
            }
          }
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
      query: `
        query UserFeatures($filters: UserFeatureFiltersInput) {
          userFeatures(filters: $filters) {
            documentId
            canUpdate
            canDelete
            canCreate
            feature {
              name
              documentId
            }
          }
        }
      `,
      variables: {
        filters: {
          user: { documentId: { eq: loginData.user.documentId } },
          feature: { isActive: { eq: true } },
        },
      },
    });

    return {
      user: loginData,
      features: featuresResponse.data.data.userFeatures,
    };
  } catch (err) {
    return undefined;
  }
};
