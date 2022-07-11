# gulp-mock-module [![NPM version][npm-image]][npm-url]

> A module replacement plugin for gulp

[Read me for gulp 3](README-gulp3.md)

## Usage

First, install `gulp-mock-module` as a development dependency:

```shell
npm install --save-dev gulp-mock-module
# or
yarn add --dev gulp-mock-module
```

Then, add it to your `gulpfile.js`:

```javascript
const mock = require("gulp-mock-module");
const path = require("path");
const { src, dest } = require("gulp");

function replaceTemplate() {
  return src(["file.txt"])
    .pipe(
      mock(
        ["module1", "module2"],
        path.resolve(process.cwd(), "path-to-folder-containig-mocks")
      )
    )
    .pipe(dest("build/"));
}

exports.replaceTemplate = replaceTemplate;
```

## API

`gulp-mock-module` only takes in two parameters

```javascript
mock(targetModules, mockDirectory);
```

<br />

### targetModules

Type: `String[]`

The names for the modules to replace with a mock.

Note: file extensions are not used in the process so do not include them. As for the file type or the language of the file - Currently, this is only being used for typescript and javascript files.

```javascript
["module1", "module2"];
```

<br />

### mockDirectory

Type: `String`

The location of the folder that contains the mocks.

Note: This has not been tested for relative paths, so use `path.resolve()`

```javascript
path.resolve(process.cwd(), "src", "mocks");
```

[npm-url]: https://npmjs.org/package/gulp-mock-module
[npm-image]: https://badge.fury.io/js/gulp-mock-module.svg
