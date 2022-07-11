class TestService {
  #age;
  #aRandomProperty;
  #name;

  constructor({ age, name }) {
    console.log("TEST SERVICE MOCK INITIALIZED");
    console.log("TEST SERVICE MOCK PARAMS: ", { age, name });

    this.#age = "mockAge";
    this.#aRandomProperty = "mockARandomProperty";
    this.#name = "mockName";
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
