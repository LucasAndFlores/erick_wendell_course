const item = {
  name: "lucas",
  age: 29,
  toString() {
    return `Name: ${this.name} - Age: ${this.age}`;
  },
  valueOf() {
    return 007;
  },
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: 13,
    };

    return types[coercionType];
  },
};

// console.log("item", item + 0); // Pra valor numerico, sempre chama primeiro o value of, se nao retornar um tipo primitivo, vai chamar o toString

//Symbol to primitive, o pica
console.log("string", String(item));
console.log("Number", Number(item));
console.log("Date", new Date(item));
