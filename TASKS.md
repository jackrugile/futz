# Tasks

## Controls

- [x] button
- [x] range
- [ ] minMax range
- [ ] number (no bounds)
- [x] boolean
- [ ] select dropdown
- [ ] multiselect
- [ ] pad control for two axes
- [ ] color picker
  - [ ] not sure how in depth to get there

## Common

- [ ] save preset
- [ ] select preset
- [ ] export/import presets
- [ ] randomize single
- [ ] mutate single
- [ ] lock
- [ ] unlock
- [ ] config history
- [ ] collapsible panels
- [ ] tool tip descriptions

## Completed Features

- [x] animate digits when randomizing
- [x] prevent text selection when dragging
- [x] allow for chaining calls
- [x] allow for multiple instances
- [x] keyboard mappings for up/down on each input, larger change when shift key is down
- [x] randomize all
- [x] mutate all
- [x] mousewheel up/down, larger change when shift key is down
- [x] global "changeCallback" for any control changed
- [x] selection colors
- [x] set decimal count to amount of step, so that it never jumps
- [x] able to type in numbers
- [x] eased value setting is now tracked independently from actual value. actual values will still get rounded to steps properly
- [x] flash randomize and mutate buttons when all are getting triggered
- [x] custom easing for randomize and mutate, combine map and ease
- [x] trigger global onchange only once when multiple controls are changed
- [x] programmatically set values
- [x] show suffix/unit
- [x] control descriptions
- [x] reset to default functionality

## Misc

- [ ] post set function for mapping to different values?
- [ ] determine what should be added to base control, and what should be added to specific control types
- [ ] pinned, floating, or block panel options
- [ ] store history of changes, like bfxr?
- [ ] destroy/update method for controls
- [ ] exponential/function based values ranges?
- [ ] move styles to only js, or output style block, for simplicity of overrides
- [ ] pin locations
- [ ] preset themes
- [ ] output current settings, and output code to rebuild settings (definitions)
- [ ] methods to add new controls, or load from initial contructor
- [ ] list browser compatibility, get polyfills where needed
- [ ] look in to accessibility concerns
- [ ] label text and input text aren't perfectly aligned vertically
- [ ] click and drag up/down on input value to change value? (like dat gui)
- [ ] does travis need the gulp-cli install?
- [ ] be able to override global defaults
- [ ] add css prefixes to JS for transform translateX
- [ ] onChange, onChangeStart, on onChangeComplete for individua controls?
- [ ] setup subdomain
- [ ] destroy methods for whole thing and infividual inputs
- [ ] ability to add new field between others
- [ ] scrollbar styles and capability;

## Maybes

- [ ] perhaps remove easing to reduce code size, move to a custom function people can plug in?
- [ ] can this work for touch devices?
- [ ] theme builder
- [ ] map to object, just like dat gui?
- [ ] color coding options
- [ ] set custom mutation ratio

## Docs

- [ ] complete all JSDoc docs
- [ ] add getting started and more helpful basic docs
- [ ] provide common demos and examples

## Design

- [ ] logo
- [ ] favicon

## Non Plugin Code

- [x] publish on npm
- [x] changelog
- [x] semver releases
- [x] yarn
- [x] UMD
- [x] shields/badges
- [x] travis
- [x] editor config
- [x] jsdoc for classes and methods
- [x] 'use strict';
- [x] eslint
- [ ] road map
- [ ] bower
- [ ] cdnjs
- [ ] unpkg
- [ ] jsdelivr
- [ ] tests
