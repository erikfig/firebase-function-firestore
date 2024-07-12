import {db} from "../../config/firebase";

export const getUser = async (id: string) => {
  const usersRef = await db.collection("users");
  const result = await usersRef.doc(id).get();
  const idDoc = result.id;

  return {id: idDoc, ...result.data()};
};
