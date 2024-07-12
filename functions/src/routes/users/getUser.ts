import {onRequest} from "firebase-functions/v2/https";
import {getUser as getUserService} from "../../services/users/getUser";
import {User} from "../../types/user";

export const getUser = onRequest(async ({params}, response) => {
  const id = params[0];

  if (!id) {
    const error = {status: "error", message: "ID is required"};
    response.status(422).send(error);

    return;
  }

  const user: User = await getUserService(id);

  if (!user.name) {
    const error = {status: "error", message: "User not found"};
    response.status(404).send(error);

    return;
  }

  response.send(user);
});
