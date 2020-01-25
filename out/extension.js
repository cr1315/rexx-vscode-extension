'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// src/extension.ts
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ scheme: "file", language: "rexx" }, new RexxConfigDocumentSymbolProvider()));
}
exports.activate = activate;
class RexxConfigDocumentSymbolProvider {
    format(cmd) {
        return cmd.substr(1).toLowerCase().replace(/^\w/, c => c.toUpperCase());
    }
    provideDocumentSymbols(document, token) {
        return new Promise((resolve, reject) => {
            let symbols = [];
            let nodes = [symbols];
            let inside_marker = false;
            let inside_run = false;
            let inside_userinput = false;
            let symbolkind_marker = vscode.SymbolKind.Field;
            let symbolkind_run = vscode.SymbolKind.Event;
            let symbolkind_cmd = vscode.SymbolKind.Function;
            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);
                let tokens = line.text.split(" ");
                if (line.text.match(/^\s*[@\d\w]+:/)) {
                    let colon_index = line.text.indexOf(":");
                    let cmd_symbol = new vscode.DocumentSymbol(line.text.substring(0, colon_index), '', symbolkind_cmd, line.range, line.range);
                    nodes[nodes.length - 1].push(cmd_symbol);
                }
            }
            resolve(symbols);
        });
    }
}
//# sourceMappingURL=extension.js.map