// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as express from "express";
import {Request} from "firebase-functions/lib/common/providers/https.d";
import {test, mock} from "node:test";
import {strict as assert} from "assert";
import {setUser} from "./setUser";
import * as setUserService from "../../services/users/setUserAlternative";

test("route: setUser: success", async (t) => {
  mock.method(setUserService, "setUserAlternative", async () => ({id: 1}));

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

  await setUser(req, res);

  const actual = res.send.mock.calls[0].result;
  const expected = {
    status: "success",
    result: {id: 1},
  };

  assert.deepEqual(actual, expected);
});

test("route: setUser: Name is required", async (t) => {
  mock.method(setUserService, "setUserAlternative", async () => ({id: 1}));

  const req = {
    body: {},
  } as unknown as Request;

  const res = {
    status() {
      return this;
    },
    send: (data: unknown) => data,
  } as unknown as express.Response;

  t.mock.method(res, "send");

  await setUser(req, res);

  const actual = res.send.mock.calls[0].result;
  const expected = {status: "error", message: "Name is required"};

  assert.deepEqual(actual, expected);
});
