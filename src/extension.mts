// Author: Igor Dimitrijević (@igorskyflyer)

import { duoscribi } from '@igor.dvlpr/duoscribi'
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('duoscribi.apply', () => {
      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor

      if (!editor) {
        return
      }

      const selections: readonly vscode.Selection[] = editor.selections
      const selectionsCount: number = selections.length

      if (selectionsCount < 1) {
        return
      }

      editor.edit((editBuilder: vscode.TextEditorEdit) => {
        for (let i = 0; i < selectionsCount; i++) {
          const selection: vscode.Selection = selections[i]
          const selectionRange = new vscode.Range(
            selection.start.line,
            selection.start.character,
            selection.end.line,
            selection.end.character
          )
          const selected: string = editor.document.getText(selectionRange)

          editBuilder.replace(selectionRange, duoscribi(selected))
        }
      })
    })
  )
}

export function deactivate() {}
