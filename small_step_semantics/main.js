class Number {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  toString() {
    return this.getValue().toString();
  }

  inspect() {
    return `<< ${this} >>`;
  }
}

class Add {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  returnValue() {
    return this.left + this.right;
  }

  toString() {
    return `${this.left} + ${this.right}`;
  }

  inspect() {
    return `<< ${this} >>`;
  }
}

class Multipy {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  returnValue() {
    return this.left * this.right;
  }

  toString() {
    return `${this.left} * ${this.right}`;
  }

  inspect() {
    return `<< ${this} >>`;
  }
}

console.log(
  new Add(
    new Multipy(new Number(1), new Number(2)).inspect(),
    new Multipy(new Number(3), new Number(4)).inspect()
  ).inspect()
);
