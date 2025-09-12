import { createNewAccessTokenUseRefreshToken } from "../../utils/userToken";

const createNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenUseRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken.accessToken,
  };
};

export const authService = {
  createNewAccessToken,
};
