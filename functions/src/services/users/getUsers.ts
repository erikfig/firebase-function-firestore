import {DocumentData} from "firebase-admin/firestore";
import {db} from "../../config/firebase";

export const getUsers = async () => {
  const docs: DocumentData[] = [];
  const usersRef = await db.collection("users");
  const result = await usersRef.get();

  result.forEach((doc) => docs.push({id: doc.id, ...doc.data()}));

  return docs;
};
