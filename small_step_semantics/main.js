class Number {
  constructor(value) {
    this.value = value;
    this.reducible = false;
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
    this.reducible = true;
  }

  reduce(environment) {
    if (this.left.reducible) {
      return new Add(this.left.reduce(environment), this.right);
    } else if (this.right.reducible) {
      return new Add(this.left, this.right.reduce(environment));
    } else {
      return new Number(this.left.getValue() + this.right.getValue());
    }
  }

  getValue() {
    return this.left + this.right;
  }

  toString() {
    return `${this.left} + ${this.right}`;
  }

  inspect() {
    return `<< ${this.left.getValue()} + ${this.right.getValue()} >>`;
  }
}

class Multiply {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this.reducible = true;
  }

  reduce(environment) {
    if (this.left.reducible) {
      return new Multiply(this.left.reduce(environment), this.right);
    } else if (this.right.reducible) {
      return new Multiply(this.left, this.right.reduce(environment));
    } else {
      return new Number(this.left.getValue() * this.right.getValue());
    }
  }

  getValue() {
    return this.left * this.right;
  }

  toString() {
    return `${this.left} * ${this.right}`;
  }

  inspect() {
    return `<< ${this.left.getValue()} * ${this.right.getValue()} >>`;
  }
}

class Boolean {
  constructor(value) {
    this.value = value;
    this.reducible = false;
  }

  getValue() {
    return this.value;
  }

  inspect() {
    return `<< ${this.value} >>`;
  }
}

class LessThan {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this.reducible = true;
  }

  inspect() {
    return `<< ${this.left} < ${this.right} >>`;
  }

  reduce(environment) {
    if (this.left.reducible) {
      return new LessThan(this.left.reduce(environment), this.right);
    } else if (this.right.reducible) {
      return new LessThan(this.left, this.right.reduce(environment));
    } else {
      return new Boolean(this.left.getValue() < this.right.getValue());
    }
  }
}

class Machine {
  constructor(expression,environment) {
    this.expression = expression;
    this.environment = environment
  }

  step() {
    console.log(this.expression.inspect());
    this.expression = this.expression.reduce(this.environment);
  }

  run() {
    while (this.expression.reducible) {
      this.step();
    }
    return this.expression;
  }
}

class Variable {
    constructor(key){
        this.key = key;
        this.reducible = true;
    }

    inspect(){
        return `<< ${this.getKey()} >>`
    }

    getValue(){
        return this.key;
    }

    reduce(environment){
        return environment[this.getValue()];
    }
}

console.log(
  new Add(
    new Multiply(new Number(1), new Number(2)),
    new Multiply(new Number(3), new Number(4))
  )
);

console.log(
  new Machine(
    new Multiply(new Add(new Number(1), new Number(2)), new Number(3))
  ).run()
);

console.log(
  new Machine(
    new LessThan(
      new Multiply(new Add(new Number(1), new Number(2)), new Number(3)),
      new Add(
        new Multiply(new Number(4), new Multiply(new Number(5), new Number(6))),
        new Number(7)
      )
    )
  ).run()
);

console.log(
    new Machine(
        new Add(
            new Variable("x"),new Variable("y")
        ),
        {
            x: new Number(1),
            y: new Number(4)
        }
    ).run()
)
