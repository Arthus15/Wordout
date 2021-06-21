import { WordoutDb } from './database';
import { Test } from './models';

var rowHTML = '<tr>' +
    ' <td>{word}</td>' +
    ' <td>{result}</td>' +
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

    row = row.replace('{word}', word.word);

    return row.replace('{result}', word.result ? 'Correcto' : 'Incorrecto');
}