"use strict";

const should = require("chai").should();
const fs = require("fs");
const path = require("path");
const File = require("vinyl");

const mockModulePlugin = require("../");

describe("gulp-mock-module", () => {
  describe("mockModulePlugin()", () => {
    const targetModules = ["testService"];
    const mockDirectory = path.resolve(__dirname, "mocks");

    describe("equal depth", () => {
      const dependentFilePath = path.resolve(
        __dirname,
        "dependents/aDependentModule.js"
      );
      const expectedFilePath = path.resolve(
        __dirname,
        "expected/aDependentModule.js"
      );
      const file = new File({
        path: dependentFilePath,
        contents: fs.readFileSync(dependentFilePath),
      });
      const check = (stream, done, cb) => {
        stream.on("data", (newFile) => {
          cb(newFile);
          done();
        });

        stream.write(file);
        stream.end();
      };

      it("should replace the import string in the dependent file", (done) => {
        const stream = mockModulePlugin(targetModules, mockDirectory);

        check(stream, done, (newFile) =>
          String(newFile.contents).should.equal(
            fs.readFileSync(expectedFilePath, "utf8")
          )
        );
      });
    });

    describe("deeply nested dependent", () => {
      const dependentFilePath = path.resolve(
        __dirname,
        "dependents/a/deeply/nested/dependent/aDeeplyNestedDependent.js"
      );
      const expectedFilePath = path.resolve(
        __dirname,
        "expected/a/deeply/nested/dependent/aDeeplyNestedDependent.js"
      );
      const file = new File({
        path: dependentFilePath,
        contents: fs.readFileSync(dependentFilePath),
      });
      const check = (stream, done, cb) => {
        stream.on("data", (newFile) => {
          cb(newFile);
          done();
        });

        stream.write(file);
        stream.end();
      };

      it("should replace the import string in the deeply nested dependent file", (done) => {
        const stream = mockModulePlugin(targetModules, mockDirectory);

        check(stream, done, (newFile) =>
          String(newFile.contents).should.equal(
            fs.readFileSync(expectedFilePath, "utf8")
          )
        );
      });
    });

    describe("deeply nested mock", () => {
      const dependentFilePath = path.resolve(
        __dirname,
        "dependents/aDeeplyNestedServiceDependentModule.js"
      );
      const expectedFilePath = path.resolve(
        __dirname,
        "expected/aDeeplyNestedServiceDependentModule.js"
      );
      const file = new File({
        path: dependentFilePath,
        contents: fs.readFileSync(dependentFilePath),
      });
      const check = (stream, done, cb) => {
        stream.on("data", (newFile) => {
          cb(newFile);
          done();
        });

        stream.write(file);
        stream.end();
      };

      it("should replace the import string in the deeply nested service dependent file", (done) => {
        const stream = mockModulePlugin(
          targetModules,
          path.resolve(__dirname, "mocks/a/deeply/nested/mock")
        );

        check(stream, done, (newFile) =>
          String(newFile.contents).should.equal(
            fs.readFileSync(expectedFilePath, "utf8")
          )
        );
      });
    });
  });
});
