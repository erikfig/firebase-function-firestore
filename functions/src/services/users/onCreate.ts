import {firestore} from "firebase-functions";
import {db} from "../../config/firebase";
import {QueryDocumentSnapshot} from "firebase-functions/v1/firestore";

export const onCreateHandler = async (change: QueryDocumentSnapshot) => {
  const doc = db.collection("autoincrementId").doc("users");
  const current = (await doc.get()).data();

  if (change?.id === "autoincrementId") {
    return;
  }

  let id = 1;

  if (current) {
    id = parseInt(current.id)+1;
  }

  await change.ref.update({id});

  return await doc.set({id});
};

export const onUserCreate = firestore
  .document("users/{userId}")
  .onCreate(onCreateHandler);
