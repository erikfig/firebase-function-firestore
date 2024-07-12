import {test, mock} from "node:test";
import {strict as assert} from "assert";
import {getUserLast} from "./getUserLast";
import {userMock} from "../../_mock/users";
import {db} from "../../config/firebase";

test("service: getUserLastLast: success", async () => {
  mock.method(db, "collection", () => ({
    doc() {
      return this;
    },
    get() {
      return [
        {
          id: 1,
          data: () => userMock,
        },
      ];
    },
  }));

  const actual = await getUserLast();

  assert.deepEqual(actual, {id: 1, ...userMock});
});
