import {test, mock} from "node:test";
import {strict as assert} from "assert";
import {setUser} from "./setUser";
import {db} from "../../config/firebase";

test("service: setUser: success", async () => {
  mock.method(db, "collection", () => ({
    doc() {
      return this;
    },
    add() {
      return {
        id: 1,
      };
    },
  }));

  const actual = await setUser({name: "user"});

  assert.deepEqual(actual, {id: 1});
});
