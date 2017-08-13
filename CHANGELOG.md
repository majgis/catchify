# catchify Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - YYYY-MM-DD

### Major
- Do not spread values returned by catchify.all(iterable)

### Minor

### Patch

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

[Unreleased]: https://github.com/majgis/catchify/compare/v1.1.4...master
[v1.1.4]: https://github.com/majgis/catchify/compare/v1.1.3...v1.1.4
[v1.1.3]: https://github.com/majgis/catchify/compare/v1.1.2...v1.1.3
[v1.1.2]: https://github.com/majgis/catchify/compare/v1.1.1...v1.1.2
[v1.1.1]: https://github.com/majgis/catchify/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/majgis/catchify/compare/v1.0.2...v1.1.0
[v1.0.2]: https://github.com/majgis/catchify/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/majgis/catchify/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/majgis/catchify/commits/v1.0.0
