import {test, mock} from "node:test";
import {strict as assert} from "assert";
import {getUser} from "./getUser";
import {userMock} from "../../_mock/users";
import {db} from "../../config/firebase";

test("service: getUser: success", async () => {
  mock.method(db, "collection", () => ({
    doc() {
      return this;
    },
    get() {
      return {
        id: 1,
        data: () => userMock,
      };
    },
  }));

  const actual = await getUser("1");

  assert.deepEqual(actual, {id: 1, ...userMock});
});
