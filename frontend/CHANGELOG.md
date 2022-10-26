# Changelog
## 2.3 (5/31/2019)
### Added
- Upgraded Gulp to version 4 using FE starter version 5.5
- Fixed issue with svg-sprite not being created.

## 2.3.2 (6/11/2019)
### Added
- Fixing form error messages not showing issue

## 2.3.1 (6/4/2019)
### Added
- Fixing build issue with tasks not running in the correct order

## 2.3 (5/31/2019)
### Added
- New Forms objects and components
- New Base Template
-- Has a skip main nav link
-- Includes Landmarks

## 2.2 (12/13/2018)
### Changed
- Update to quench 4.9
- Bump some npm package versions to match versions in quench 4.9

### Fixed
- Removed task files from older versions of quench
- Remove empty json file that was confusing pattern lab

## 2.1.0 (10/05/2018)
### Added
- Created a changelog!
- Additional documentation guides for Thread Search architecture and configuration
- JSdoc typedefs for `SearchResultsShape` and `InitialState`


### Changed
- Pattern Lab gulp task now uses `--patternsonly` flag for generation

### Fixed
- Fixed an issue where `lab/public/index.html` was ignored by git causing first-time build errors
- Fixed an issue using constructor functions with PopStateEvent in IE11. Added a PopStateEvent polyfill to compensate.
- Pattern generation should no longer throw warnings about null annotation data
- VR-718, VR-715 - Fix issues with 50/50 and 30/70 containers not stacking at appropriate breakpoints
- VR-707 - Fix IE11 issue with search box not aligned correctly under utility nav
- VR-708 - Fix flexbox measurement issues for search result items in IE11
- VR-708 - Add PopStateEvent polyfill for IE11
- VR-720 - Allow iframes from google maps embeds to resize responsively
- VR-709 - Fix image alignment issues in Content List when viewing in Edit mode
