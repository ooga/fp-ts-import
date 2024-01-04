# fp-ts Import README

    fork from https://github.com/SilentEchoGM/fp-ts-import-helper

This extension exists purely to save me the hassle of importing modules from fp-ts and aliasing them via snippets or manual typing.

## Features

Provides code completions in TypeScript files for abbreviated names of commonly used fp-ts modules. For example, typing `A` and then a `.` will prepend the current file with the abbreviated import and reload intellisense to provide completions for `A.`

### Import style

module import (default)

```typescript
import * as A from "fp-ts/Array";
```

root import

```typescript
import { Array as A } from "fp-ts";
```

### List of abbreviations

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
