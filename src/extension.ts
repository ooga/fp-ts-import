import * as O from "fp-ts/Option";
import * as Rec from "fp-ts/Record";
import * as vscode from "vscode";

import * as A from "fp-ts/Array";
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
const lowercaseModuleNames = [
  "boolean",
  "function",
  "number",
  "pipeable",
  "string",
  "struct",
];
export function activate(context: vscode.ExtensionContext) {
  const importFormat = pipe(
    O.fromNullable(
      vscode.workspace
        .getConfiguration("fp-ts-import")
        .get<string>("importFormat")
    ),
    O.getOrElse(() => "")
  );

  const output = vscode.window.createOutputChannel("fp-ts-import", {
    log: true,
  });
  output.debug("configuration", { importFormat });

  const disposable = vscode.languages.registerCompletionItemProvider(
    ["typescript", "typescriptreact", "javascript", "javascriptreact"],
    {
      provideCompletionItems(document, position, ___, context) {
        const previousCharacter = document.getText(
          new vscode.Range(
            new vscode.Position(position.line, position.character - 1),
            position
          )
        );

        return pipe(
          dict,
          Rec.keys,
          A.filter((alias) => alias.includes(previousCharacter)),
          A.map(addCompletion(importFormat))
        );
      },
    }
  );

  context.subscriptions.push(disposable);
}

const addCompletion = (importFormat: string) => (alias: keyof typeof dict) => {
  const rootImportName = dict[alias];
  const completion = new vscode.CompletionItem(alias);
  completion.additionalTextEdits = [
    new vscode.TextEdit(
      new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0)),
      importFormat === "module"
        ? `import * as ${alias} from "fp-ts/${
            lowercaseModuleNames.includes(rootImportName)
              ? rootImportName
              : capitalize(rootImportName)
          }";\n`
        : `import { ${rootImportName} as ${alias} } from "fp-ts";\n`
    ),
  ];
  completion.kind = vscode.CompletionItemKind.Module;
  completion.commitCharacters = ["."];
  completion.insertText = alias;
  completion.command = {
    command: "editor.action.triggerSuggest",
    title: "Re-trigger completions...",
  };

  return completion;
};

function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}
