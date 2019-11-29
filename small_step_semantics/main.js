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

  reduce() {
    if (this.left.reducible) {
      return new Add(this.left.reduce(), this.right);
    } else if (this.right.reducible) {
      return new Add(this.left, this.right.reduce());
    } else {
      return new Number(this.left.getValue() + this.right.getValue());
    }
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

class Multiply {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this.reducible = true;
  }

  reduce() {
    if (this.left.reducible) {
      return new Multiply(this.left.reduce(), this.right);
    } else if (this.right.reducible) {
      return new Multiply(this.left, this.right.reduce());
    } else {
      return new Number(this.left.getValue() * this.right.getValue());
    }
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

class Boolean {
    constructor(value){
        this.value = value;
        this.reducible = false;
    }

    getValue(){
        return this.value;
    }

    inspect(){
        return `<< ${this.value} >>`;
    }
}

class LessThan {
    constructor(left,right){
        this.left = left;
        this.right = right;
        this.reducible = true;
    }

    inspect(){
        return `<< ${this.left} < ${this.right} >>`
    }

    reduce(){
        if(this.left.reducible){
            return new LessThan(this.left.reduce(),this.right);
        }else if(this.right.reducible){
            return new LessThan(this.left,this.right.reduce());
        }else{
            return new Boolean(this.left.getValue() < this.right.getValue())
        }
    }

}

class Machine {
  constructor(expression) {
    this.expression = expression;
  }

  step() {
    console.log(this.expression.inspect());
    this.expression = this.expression.reduce();
  }

  run() {
    while (this.expression.reducible) {
      this.step();
    }
    return this.expression;
  }
}

console.log(
  new Add(
    new Multiply(new Number(1), new Number(2)),
    new Multiply(new Number(3), new Number(4))
  )
);

console.log(new Add(new Number(1), new Number(2)).reduce());

console.log(
  new Machine(
    new Multiply(new Add(new Number(1), new Number(2)), new Number(3))
  ).run()
);

console.log(
    new Machine(
        new LessThan(
            new Multiply(
                new Add(
                    new Number(1),
                    new Number(2)
                ),
                new Number(3)
            ),
            new Add(
                new Multiply(
                    new Number(4),
                    new Multiply(
                        new Number(5),
                        new Number(6)
                    )
                ),
                new Number(7)
            )
        )
    ).run()
)
