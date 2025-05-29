import { useQuery } from "@tanstack/react-query";
import { noRefreshState } from "../zustand-store";
import { UserRepo } from "../shared/data/UserRepo";
import { AuthService } from "./authService";

export const UserAuthorties = () => {
  let token = AuthService.getToken();
  const { data: userInfo } = useQuery({ queryKey: ["userInfo"], ...noRefreshState, queryFn: UserRepo.user_auth, enabled: !!token });

  const canCreate = (featureName) => {
    return userInfo?.features?.find((el) => el.system_feature.path == featureName)?.canCreate;
  };

  const canUpdate = (featureName) => {
    return userInfo?.features?.find((el) => el.system_feature.path == featureName)?.canUpdate;
  };

  const canDelete = (featureName) => {
    return userInfo?.features?.find((el) => el.system_feature.path == featureName)?.canDelete;
  };

  return { canCreate, canUpdate, canDelete };
};
