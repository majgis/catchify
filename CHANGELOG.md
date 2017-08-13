# catchify Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - YYYY-MM-DD

### Major

### Minor

### Patch

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

[Unreleased]: https://github.com/majgis/catchify/compare/v2.2.1...master
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
