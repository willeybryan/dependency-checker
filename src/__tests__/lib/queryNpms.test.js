import { fetch } from "node-fetch";
import { queryNpms } from "../../lib/queryNpms";

jest.mock("node-fetch", () => {
  const actualFetch = require.requireActual("node-fetch");
  return {
    ...actualFetch,
    fetch: jest.fn(async url => {
      return {
        json: () => ({
          score: {
            final: 1
          }
        })
      };
    })
  };
});

test("queries Npms for data about a package", async () => {
  const result = await queryNpms("foo", fetch);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(result).toEqual({ score: { final: 1 } });
});
