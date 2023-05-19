import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { Server } from "http";
import { injectHttpInterceptor } from "./agent.js";

const originalHttp = jest.createMockFromModule("http");

describe("Http Interceptor Agent", () => {
  const eventName = "request";
  const request = null;

  beforeEach(() => jest.clearAllMocks());
  test("Should not change header", () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };
    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).not.toHaveBeenCalled();
  });
  test("Should activate header interceptor", () => {
    injectHttpInterceptor();
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };
    const serverInstance = new Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).toHaveBeenCalledWith(
      "X-instrumented-by",
      "lucas-andrade"
    );
  });
});
