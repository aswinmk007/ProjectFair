import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

//update user

export const updateUserAPI = async (reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/edit-user`, reqBody, reqHeader);
};
