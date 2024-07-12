import {onRequest} from "firebase-functions/v2/https";
import {getUsers as getUsersService} from "../../services/users/getUsers";

export const getUsers = onRequest(async (request, response) => {
  const users = await getUsersService();
  response.send(users);
});
