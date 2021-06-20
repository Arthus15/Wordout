import { WordoutDb } from './database';

var db = new WordoutDb();

async function AddWordAsync() {
    var word = document.getElementById('word') as HTMLInputElement;
    var result = document.getElementById('wordResult') as HTMLSelectElement;

    if (word != null && result != null) {
        var wordValue = word.value;
        var wordResult = result.value == 'true' ? 1 : 0;

        await db.insertAsync(`INSERT INTO words VALUES ("${wordValue}", ${wordResult})`)
    }
}