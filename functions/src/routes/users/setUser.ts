import {onRequest} from "firebase-functions/v2/https";
import {
  setUser as setUserService,
} from "../../services/users/setUser";

export const setUser = onRequest(async (request, response) => {
  const {body} = request;

  if (!body.name) {
    const error = {status: "error", message: "Name is required"};
    response.status(422).send(error);

    return;
  }

  const result = await setUserService(body);
  response.send({status: "success", result});
});
