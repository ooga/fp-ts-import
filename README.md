# fp-ts Import Helper README

This extension exists purely to save me the hassle of importing modules from fp-ts and aliasing them via snippets or manual typing.

## Features

Provides code completions in TypeScript files for abbreviated names of commonly used fp-ts modules. For example, typing `A` and then a `.` will prepend `import {array as A } from 'fp-ts'` to the current file and reload intellisense to provide completions for `A.`

List of abbreviations:

- RA: "readonlyArray"
- f: "function"
- T: "task"
- TE: "taskEither"
- TO: "taskOption"
- O: "option"
- E: "either"
- A: "array"
- R: "record"
- M: "map"
- NEA: "nonEmptyArray"
- RNEA: "readonlyNonEmptyArray"
- FDate: "date"
- FSet: "set"
- S: "state"
- Str: "string"
- Eq: "eq"
- Ord: "ord"
- IO: "io"
- These: "these"

## Known Issues

None

## Release Notes
