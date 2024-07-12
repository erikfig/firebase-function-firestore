// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as express from "express";
import {Request} from "firebase-functions/lib/common/providers/https.d";
import {test, mock} from "node:test";
import {strict as assert} from "assert";
import {getUsers} from "./getUsers";
import * as getUsersService from "../../services/users/getUsers";

test("route: getUsers: success", async (t) => {
  mock.method(getUsersService, "getUsers", async () => ([]));

  const req = {
    body: {name: "user name"},
  } as unknown as Request;

  const res = {
    status: () => ({
      send: (data: unknown) => data,
    }),
    send: (data: unknown) => data,
  } as unknown as express.Response;

  t.mock.method(res, "send");

  await getUsers(req, res);

  const actual = res.send.mock.calls[0].result;
  const expected = [];

  assert.deepEqual(actual, expected);
});
