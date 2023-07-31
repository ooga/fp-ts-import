# fp-ts Import Helper README

This extension exists purely to save me the hassle of importing modules from fp-ts and aliasing them via snippets or manual typing.

## Features

Provides code completions in TypeScript files for abbreviated names of commonly used fp-ts modules. For example, typing `A` and then a `.` will prepend `import {array as A } from 'fp-ts'` to the current file and reload intellisense to provide completions for `A.`

List of abbreviations:

- A: "array"
- E: "either"
- Eq: "eq"
- f: "function"
- FDate: "date"
- FRandom: "random"
- FSet: "set"
- IO: "io"
- M: "map"
- NEA: "nonEmptyArray"
- N: "number"
- O: "option"
- Ord: "ord"
- R: "record"
- RA: "readonlyArray"
- RNEA: "readonlyNonEmptyArray"
- S: "state"
- Str: "string"
- T: "task"
- TE: "taskEither"
- These: "these"
- TO: "taskOption"

## Known Issues

None

## Release Notes
