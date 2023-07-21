import * as vscode from "vscode";

import {
  array as A,
  either as E,
  eq as Eq,
  date as FDate,
  set as FSet,
  map as M,
  nonEmptyArray as NEA,
  option as O,
  ord as Ord,
  record as R,
  readonlyArray as RA,
  readonlyNonEmptyArray as RNEA,
  state as S,
  string as Str,
  task as T,
  taskEither as TE,
  taskOption as TO,
  function as f,
} from "fp-ts";

const dict = {
  RA: "readonlyArray",
  f: "function",
  T: "task",
  TE: "taskEither",
  TO: "taskOption",
  O: "option",
  E: "either",
  A: "array",
  R: "record",
  M: "map",
  NEA: "nonEmptyArray",
  RNEA: "readonlyNonEmptyArray",
  FDate: "date",
  FSet: "set",
  S: "state",
  Str: "string",
  Eq: "eq",
  Ord: "ord",
  IO: "io",
  These: "these",
};
export function activate(context: vscode.ExtensionContext) {
  const completion = vscode.languages.registerCompletionItemProvider(
    "typescript",
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        const addCompletion = (mod: keyof typeof dict) => {
          const completion = new vscode.CompletionItem(mod);
          completion.additionalTextEdits = [
            new vscode.TextEdit(
              new vscode.Range(
                new vscode.Position(0, 0),
                new vscode.Position(0, 0)
              ),
              `import { ${dict[mod]} as ${mod} } from "fp-ts";\n`
            ),
          ];
          completion.kind = vscode.CompletionItemKind.Module;
          completion.commitCharacters = ["."];
          completion.insertText = mod;
          completion.command = {
            command: "editor.action.triggerSuggest",
            title: "Re-trigger completions...",
          };

          return completion;
        };

        return f.pipe(
          dict,
          R.keys,
          A.map((mod) => addCompletion(mod))
        );
      },
    }
  );

  context.subscriptions.push(completion);
}
