const TestService = require("../services/testService");

const aService = new TestService({
  age: 5,
  name: "A random test service",
});

module.exports = {
  getServiceAge() {
    return aService.age();
  },
  getServiceARandomProperty() {
    return aService.aRandomProperty();
  },
  getServiceName() {
    return aService.name();
  },
};
