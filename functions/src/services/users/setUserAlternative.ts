import {db} from "../../config/firebase";
import {User} from "../../types/user";
import {getUserLast} from "./getUserLast";

export const setUserAlternative = async (user: User) => {
  const last = await getUserLast();
  const id = last ? parseInt(last.id)+1 : 1;
  const result = await db.collection("users").doc(`${id}`).set(user);
  return result;
};
