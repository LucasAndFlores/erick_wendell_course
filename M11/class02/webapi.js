import { createServer } from "http";
import { Readable } from "stream";
function api1(request, response) {
  let count = 0;
  const maxItems = 99;

  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({ id: Date.now() + count, name: `Lucas-${count}` }) +
              "\n"
          );
          return;
        }

        clearInterval(intervalContext);
        this.push(null);
      };
      setInterval(function () {
        everySecond(this);
      });
    },
  });

  readable.pipe(response);
}

function api2(request, response) {
  let count = 0;
  const maxItems = 99;

  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Xuxinha-${count}`,
            }) + "\n"
          );
          return;
        }

        clearInterval(intervalContext);
        this.push(null);
      };
      setInterval(function () {
        everySecond(this);
      });
    },
  });

  readable.pipe(response);
}
createServer(api1).listen(3000, () => console.log("server is running at 3000"));
createServer(api2).listen(4000, () => console.log("server is running at 4000"));
