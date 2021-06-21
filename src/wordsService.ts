import { WordoutDb } from './database';
import { Test } from './models';

var rowHTML = '<tr id="{word}">' +
    ' <td>{word}</td>' +
    ' <td>{result}</td>' +
    ' <td> <button class="button is-danger" onClick="deleteWord(\'{word}\')">Eliminar</button></td>' +
    '<tr>';
var db = new WordoutDb();

async function initTable(): Promise<void> {
    var words = await db.selectAllAsync<Test[]>('SELECT * FROM words ORDER BY word ASC');
    var resultRows = '';

    words.forEach((word) => {
        resultRows += buildRow(word);
    });

    var tableBody = document.getElementById('tableBody') as HTMLTableRowElement;

    if (tableBody)
        tableBody.innerHTML = resultRows;
}

function buildRow(word: Test): string {
    var row = rowHTML;
    var re = /{word}/gi;
    row = row.replace(re, word.word);

    return row.replace('{result}', word.result ? 'Correcto' : 'Incorrecto');
}

async function deleteWord(word: string) {
    var row = document.getElementById(word);

    if (row)
        row.remove();

    window.resizeBy(0, 0);
    await db.execAsync(`DELETE FROM words WHERE word = '${word}';`);
}