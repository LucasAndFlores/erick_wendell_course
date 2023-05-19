import Http from "http";

export async function injectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit;
  Http.Server.prototype.emit = function (...args) {
    const [type, request, response] = args;
    if (type === "request") {
      response.setHeader("X-instrumented-by", "lucas-andrade");
    }
    return oldEmit.apply(this, args);
  };
}
