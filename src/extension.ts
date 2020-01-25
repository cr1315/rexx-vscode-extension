'use strict';

// src/extension.ts

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerDocumentSymbolProvider(
			{ scheme: "file", language: "rexx" },
			new RexxConfigDocumentSymbolProvider()
		)
	);
}

class RexxConfigDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

	private format(cmd: string): string {
		return cmd.substr(1).toLowerCase().replace(/^\w/, c => c.toUpperCase())
	}

	public provideDocumentSymbols(
		document: vscode.TextDocument,
		token: vscode.CancellationToken): Promise<vscode.DocumentSymbol[]> {
		return new Promise((resolve, reject) => {
			let symbols: vscode.DocumentSymbol[] = [];
			let nodes = [symbols]
			let inside_marker = false
			let inside_run = false
			let inside_userinput = false

			let symbolkind_marker = vscode.SymbolKind.Field
			let symbolkind_run = vscode.SymbolKind.Event
			let symbolkind_cmd = vscode.SymbolKind.Function

			for (var i = 0; i < document.lineCount; i++) {
				var line = document.lineAt(i);

				let tokens = line.text.split(" ")

				if (line.text.match(/^\s*[@\d\w]+:/)) {
					let colon_index = line.text.indexOf(":")
					let cmd_symbol = new vscode.DocumentSymbol(
						line.text.substring(0, colon_index),
						'',
						symbolkind_cmd,
						line.range, line.range)

					nodes[nodes.length - 1].push(cmd_symbol)
				}
			}

			resolve(symbols);
		});
	}
}