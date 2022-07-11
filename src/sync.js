/**
 * syncImports
 *
 * @param buffer codeLines
 * @param buffer filterOutNodeImports
 * @returns
 */
const syncImport = (prodFilePath, mocksDirectory, localImport) => {
  let fileLocation = prodFilePath.split("/");

  fileLocation.pop();
  fileLocation = fileLocation.join("/");

  const targetFile = localImport.identifyingTarget.split("/").pop();
  const mocksDirectoryFromCWD = mocksDirectory.split("/");
  const relativeImportPath = fileLocation
    .split("/")
    .filter((folder) => !mocksDirectoryFromCWD.includes(folder))
    .map((_) => "..")
    .concat(
      mocksDirectoryFromCWD.filter(
        (folder) => !fileLocation.split("/").includes(folder)
      )
    )
    .concat(targetFile)
    .join("/");

  localImport.mockImportString = localImport.original.replace(
    localImport.target,
    relativeImportPath
  );

  return localImport;
};

module.exports = syncImport;
