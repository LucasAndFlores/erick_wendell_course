"use strict";

const {
  promises: { readFile },
  watch,
} = require("fs");

class File {
  watch(event, filename) {
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const test = "test";

const file = new File();

//podemos deixar explicito qual é o contexto do this usando o bind, que preserva o "this" dentro daquele objeto expecifico
// watch(__filename, file.watch.bind(file))

// usamos o call quando precisamos "testar" o metodo daquela classe sem propriamente chamar ele
file.watch.call(
  { showContent: () => console.log("this is sinon copy") },
  null,
  __filename
);
