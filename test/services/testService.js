class TestService {
  #age;
  #aRandomProperty;
  #name;

  constructor({ age, name }) {
    this.#age = age;
    this.#aRandomProperty = Math.random() * 100;
    this.#name = name;
  }

  age() {
    return this.#age;
  }

  aRandomProperty() {
    return this.#aRandomProperty;
  }

  name() {
    return this.#name;
  }
}

module.exports = TestService;
