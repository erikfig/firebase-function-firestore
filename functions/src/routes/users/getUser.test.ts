// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as express from "express";
import {Request} from "firebase-functions/lib/common/providers/https.d";
import {test, mock} from "node:test";
import {strict as assert} from "assert";
import {getUser} from "./getUser";
import {userMock} from "../../_mock/users";
import * as getUserService from "../../services/users/getUser";

test("route: getUser: success", async (t) => {
  mock.method(getUserService, "getUser", async () => userMock);

  const req = {
    params: ["1"],
  } as unknown as Request;

  const res = {
    status() {
      return this;
    },
    send: (data: unknown) => data,
  } as unknown as express.Response;

  t.mock.method(res, "send");

  await getUser(req, res);

  const actual = res.send.mock.calls[0].result;
  const expected = userMock;

  assert.strictEqual(actual, expected);
});

test("route: getUser: error: id required", async (t) => {
  mock.method(getUserService, "getUser", async () => userMock);

  const req = {
    params: [],
  } as unknown as Request;

  const res = {
    status() {
      return this;
    },
    send: (data: unknown) => data,
  } as unknown as express.Response;

  t.mock.method(res, "send");

  await getUser(req, res);

  const actual = res.send.mock.calls[0].result;
  const expected = {status: "error", message: "ID is required"};

  assert.deepEqual(actual, expected);
});

test("route: getUser: error: user not found", async (t) => {
  mock.method(getUserService, "getUser", async () => ({}));

  const req = {
    params: [1],
  } as unknown as Request;

  const res = {
    status() {
      return this;
    },
    send: (data: unknown) => data,
  } as unknown as express.Response;

  t.mock.method(res, "send");

  await getUser(req, res);

  const actual = res.send.mock.calls[0].result;
  const expected = {status: "error", message: "User not found"};

  assert.deepEqual(actual, expected);
});

