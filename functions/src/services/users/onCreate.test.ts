import {test, mock} from "node:test";
import {strict as assert} from "assert";
import {onCreateHandler} from "./onCreate";
import {db} from "../../config/firebase";
import * as getUserLast from "./getUserLast";
import {userMock} from "../../_mock/users";
import {QueryDocumentSnapshot} from "firebase-admin/firestore";

test("service: onCreate: success", async () => {
  mock.method(getUserLast, "getUserLast", () => {
    return userMock;
  });

  mock.method(db, "collection", () => ({
    doc() {
      return this;
    },
    async get() {
      return this;
    },
    set(data: unknown) {
      return data;
    },
    data() {
      return {id: 1};
    },
  }));

  const change = {
    id: 1,
    ref: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      update: () => {},
    },
    set(data: unknown) {
      return data;
    },
  };

  const actual = await onCreateHandler(
    change as unknown as QueryDocumentSnapshot
  );

  assert.deepEqual(actual, {id: 2});
});
