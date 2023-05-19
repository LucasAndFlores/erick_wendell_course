import { createServer } from "http";

//curl "localhost:3000?salary=3000&discount=15"
//node inspect file

function netSalary({ discount, salary }) {
  const percent = discount / 100;
  const cost = salary * percent;
  const result = salary - cost;
  return result;
}

createServer((req, res) => {
  const url = req.url.replace("/", "");
  const params = new URLSearchParams(url);
  const fromEntries = Object.fromEntries(params);
  const result = netSalary(fromEntries);

  //debugger;

  res.end(`seu salario é ${result}`);
}).listen(3000, () => {
  console.log("app running at 3000");
});
