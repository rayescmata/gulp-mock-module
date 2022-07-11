/**
 * fetchImportCode
 *
 * @param string[] codeLines
 * @returns
 */
const fetchImportCode = (codeLines) =>
  codeLines
    // import x from 'y'
    // const x = require('y')
    // const x = require('x/y/z')
    .filter((line) => line.indexOf("from ") !== -1 || line.includes("require("))
    .map((original) => {
      let identifyingTarget;
      const target = original.split(/['"]/g)[1];
      const targetDirectories = target.split("/");

      if (!targetDirectories.includes("..") && !targetDirectories.includes("."))
        return;

      const indexInFile = codeLines.indexOf(original);

      if (target.includes("/")) {
        identifyingTarget = targetDirectories
          .filter((subFolder) => !["..", "."].includes(subFolder))
          .join("/");
      }

      /**
       * {
       *    target: 'x' || '../x/y/z',
       *    identifyingTarget: 'x' || 'x/y/z',
       *    original: "const x = require('../x/y/z')" || "// import x from '../x/y/z'"
       * }
       */
      return {
        target,
        identifyingTarget,
        original,
        indexInFile,
      };
    })
    .filter((x) => !!x);

/**
 * fetchMatchingImportCodes
 *
 * @param string[] fileImports
 * @param string[] targetModules
 * @returns
 */
const fetchMatchingImportCodes = (fileImports, targetModules) =>
  fileImports.filter(({ identifyingTarget }) =>
    targetModules.some((targetModule) =>
      identifyingTarget.includes(targetModule)
    )
  );

module.exports = {
  fetchImportCode,
  fetchMatchingImportCodes,
};
