const throwError = (msg) => {
  throw new Error(msg);
};

try {
  console.log("hello");
  console.log("world");
  throwError("inside of try catch");
} catch (error) {
  console.log("detected by catch", error);
} finally {
  console.log("clean up!");
}

Promise.reject("promise rejected");

process.on("unhandledRejection", (e) => {
  console.log("unhandledRejection", e);
});

process.on("uncaughtException", (e) => {
  console.log("uncaughtException", e);
});

await Promise.reject("Promise rejected with await");
