import * as vscode from "vscode";

import * as A from "fp-ts/Array";
import * as R from "fp-ts/Record";
import { pipe } from "fp-ts/function";

const dict = {
  RA: "readonlyArray",
  f: "function",
  T: "task",
  TE: "taskEither",
  TO: "taskOption",
  O: "option",
  FRandom: "random",
  N: "number",
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
  const importFormat = vscode.workspace
    .getConfiguration("fp-ts-import")
    .get("importFormat");
  const completion = vscode.languages.registerCompletionItemProvider(
    ["typescript", "typescriptreact", "javascript", "javascriptreact"],
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
              importFormat === "module"
                ? `import * as ${mod} from "fp-ts/${capitalize(dict[mod])}";\n`
                : `import { ${dict[mod]} as ${mod} } from "fp-ts";\n`
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

        return pipe(
          dict,
          R.keys,
          A.map((mod) => addCompletion(mod))
        );
      },
    }
  );

  context.subscriptions.push(completion);
}

function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}
