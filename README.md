# gulp-mock-module [![NPM version][npm-image]][npm-url]

> A module replacement plugin for gulp. It serves mock files by changing the require/import target from the target module onto the mock for that module.

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
  return src(["file.js"])
    .pipe(
      mock(
        ["module1", "module2"],
        path.resolve(process.cwd(), "folder-that-contains-the-mocks")
      )
    )
    .pipe(dest("build/"));
}

exports.replaceTemplate = replaceTemplate;
```

Where file.js is a file containing import references to module1 and module2

```javascript
// file.js

const module1 = require("path-to-module1/module1");
// or
import module2 from "path-to-module2/module2";

/**
 *
 * DOING SOMETHING AMAZING, I GUESS
 *
 */
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

The names can either be the name of the file itself `(module1.js)`, or the name of the folder containing the `index.js` that you're importing `(module2/index.js)`

Note: file extensions are not used in the process so do not include them - the format should be the same as the name you use during the import syntax.

As for the supported file types or the languages of the files - Currently, this is only being used for typescript and javascript files.

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
