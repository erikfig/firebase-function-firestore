import {test, mock} from "node:test";
import {strict as assert} from "assert";
import {setUserAlternative} from "./setUserAlternative";
import {db} from "../../config/firebase";
import * as getUserLast from "./getUserLast";
import {userMock} from "../../_mock/users";

test("service: setUserAlternative: success", async () => {
  mock.method(getUserLast, "getUserLast", () => {
    return userMock;
  });

  mock.method(db, "collection", () => ({
    doc() {
      return this;
    },
    set() {
      return {
        id: 1,
      };
    },
  }));

  const actual = await setUserAlternative({name: "user"});

  assert.deepEqual(actual, {id: 1});
});
