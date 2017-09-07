# catchify Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - YYYY-MM-DD

### Major

### Minor

### Patch

## [v2.6.1] - 2017-09-07

### Patch
- Make improvements to the readme

## [v2.6.0] - 2017-09-07

### Minor
- Add newPromiseHandle() method.

### Patch
- Fix errors in readme examples where await is missing
- Update the readme

## [v2.5.1] - 2017-08-18

### Patch
- Add an additional example to the readme
- Extract tests into separate files
- Upgrade change-log to v1.7.1

## [v2.5.0] - 2017-08-18

### Minor
- Update the readme with an additional example
- Extract API functions into separate files that can be required independently

## [v2.4.2] - 2017-08-16

### Patch
- Add semistandard and fix reported issues
- Update the readme

## [v2.4.1] - 2017-08-16

### Patch
- Exclude files from package by updating .npmignore

## [v2.4.0] - 2017-08-16

### Minor
- Make `catchify.limit(iterable, limit, exitOnError)` support objects
- Make `catchify.some(iterable)` support objects
- Make `catchify.all(iterable)` support objects

### Patch
- Add a link to this change log in the readme

## [v2.3.4] - 2017-08-16

### Patch
- Fix `catchify.all(iterable)` so that values is an array on error, 
  making it safe for array destructuring
- Replace adhoc tests with more thorough tests using ava
- Update the readme

## [v2.3.3] - 2017-08-13

### Patch
- Fix issues in the readme

## [v2.3.2] - 2017-08-13

### Patch
- Update the example in readme to show default value

## [v2.3.1] - 2017-08-13

### Patch
- Add an example to each API entry in the readme

## [v2.3.0] - 2017-08-13

### Minor
- Add an optional exitOnError parameter to `catchify.limit(iterable, limit, exitOnError)`

## [v2.2.2] - 2017-08-13

### Patch
- Fix issues in the readme

## [v2.2.1] - 2017-08-13

### Patch
- Fix issue with `catchify.some(iterable)` so that it works with iterable types other than array

## [v2.2.0] - 2017-08-13

### Minor
- Add `catchify.limit(iterable, limit)` which is like `catchify.some(iterable)` but allows 
the limiting of how many asynchronous tasks run concurrently

## [v2.1.1] - 2017-08-13

### Patch
- Fix `catchify.some(iterable)` to work with any value type, not just promises.

## [v2.1.0] - 2017-08-13

### Minor
- Add `catchify.some(iterable)` which is like `catchify.all(iterable)` but 
an error does not prevent all errors and values from being returned

## [v2.0.0] - 2017-08-13

### Major
- Do not spread values returned by catchify.all(iterable)

### Patch
- Move change-log from dependency to devDependency

## [v1.1.4] - 2017-08-09

### Patch
- Commit missing .npmignore
- Eliminate use of catch method internally, where possible

## [v1.1.3] - 2017-08-09

### Patch
- Add index.test.js to .npmignore

## [v1.1.2] - 2017-08-09

### Patch
- Update the readme

## [v1.1.1] - 2017-08-09

### Patch
- Update the readme

## [v1.1.0] - 2017-08-09

### Minor
- Add catchify.reject() which is equivalent to Promise.reject()
- Add catchify.all() which is equivalent to Promise.all()
- Add catchify.race() which is equivalent to Promise.race()
- Add catchify.resolve() which is equivalent to catchify()

### Patch
- Use static then and catch functions
- Make catchify() equivalent to Promise.resolve()

## [v1.0.2] - 2017-08-09

### Patch
- Update the readme

## [v1.0.1] - 2017-08-09

### Patch
- Update the readme

## [v1.0.0] - 2017-08-09

### Major
- Initial release

[Unreleased]: https://github.com/majgis/catchify/compare/v2.6.1...master
[v2.6.1]: https://github.com/majgis/catchify/compare/v2.6.0...v2.6.1
[v2.6.0]: https://github.com/majgis/catchify/compare/v2.5.1...v2.6.0
[v2.5.1]: https://github.com/majgis/catchify/compare/v2.5.0...v2.5.1
[v2.5.1]: https://github.com/majgis/catchify/compare/v2.5.0...v2.5.1
[v2.5.0]: https://github.com/majgis/catchify/compare/v2.4.2...v2.5.0
[v2.4.2]: https://github.com/majgis/catchify/compare/v2.4.1...v2.4.2
[v2.4.1]: https://github.com/majgis/catchify/compare/v2.4.0...v2.4.1
[v2.4.0]: https://github.com/majgis/catchify/compare/v2.3.4...v2.4.0
[v2.3.4]: https://github.com/majgis/catchify/compare/v2.3.3...v2.3.4
[v2.3.3]: https://github.com/majgis/catchify/compare/v2.3.2...v2.3.3
[v2.3.2]: https://github.com/majgis/catchify/compare/v2.3.1...v2.3.2
[v2.3.1]: https://github.com/majgis/catchify/compare/v2.3.0...v2.3.1
[v2.3.0]: https://github.com/majgis/catchify/compare/v2.2.2...v2.3.0
[v2.2.2]: https://github.com/majgis/catchify/compare/v2.2.1...v2.2.2
[v2.2.1]: https://github.com/majgis/catchify/compare/v2.2.0...v2.2.1
[v2.2.0]: https://github.com/majgis/catchify/compare/v2.1.1...v2.2.0
[v2.1.1]: https://github.com/majgis/catchify/compare/v2.1.0...v2.1.1
[v2.1.0]: https://github.com/majgis/catchify/compare/v2.0.0...v2.1.0
[v2.0.0]: https://github.com/majgis/catchify/compare/v1.1.4...v2.0.0
[v1.1.4]: https://github.com/majgis/catchify/compare/v1.1.3...v1.1.4
[v1.1.3]: https://github.com/majgis/catchify/compare/v1.1.2...v1.1.3
[v1.1.2]: https://github.com/majgis/catchify/compare/v1.1.1...v1.1.2
[v1.1.1]: https://github.com/majgis/catchify/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/majgis/catchify/compare/v1.0.2...v1.1.0
[v1.0.2]: https://github.com/majgis/catchify/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/majgis/catchify/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/majgis/catchify/commits/v1.0.0
