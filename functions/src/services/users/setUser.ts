import {db} from "../../config/firebase";
import {User} from "../../types/user";

export const setUser = async (user: User) => {
  const result = await db.collection("users").add(user);
  return {id: result.id};
};
