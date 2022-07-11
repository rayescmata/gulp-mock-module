"use strict";

const Transform = require("stream").Transform;

const { fetchImportCode, fetchMatchingImportCodes } = require("./code.js");
const syncImport = require("./sync");

const mock = (targetModules, mocksDirectory) =>
  new Transform({
    objectMode: true,
    /**
     * transformation
     * @param {import("vinyl")} file
     * @param {BufferEncoding} enc
     * @param {(error?: Error | null, data?: any) => void} callback
     */
    transform(file, enc, callback) {
      if (file.isNull()) return callback(null, file);

      // const module = file.path.split("/").pop();
      const parsedFile = file.contents.toString().split("\n");
      const fileLocalImports = fetchImportCode(parsedFile);

      if (!fileLocalImports.length) return callback(null, file);

      const matchingImports = fetchMatchingImportCodes(
        fileLocalImports,
        targetModules
      );

      if (!matchingImports.length) return callback(null, file);

      matchingImports
        .map((matchingImport) =>
          syncImport(file.path, mocksDirectory, matchingImport)
        )
        .map(
          ({ indexInFile, mockImportString }) =>
            (parsedFile[indexInFile] = mockImportString)
        );

      file.contents = Buffer.from(parsedFile.join("\n"));

      return callback(null, file);
    },
  });

module.exports = mock;
