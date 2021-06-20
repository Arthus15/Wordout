import { WordoutDb } from './database';
import { Test } from './models';

var db = new WordoutDb();

async function AddWordAsync() {
    var word = document.getElementById('word') as HTMLInputElement;
    var result = document.getElementById('wordResult') as HTMLSelectElement;

    if (word != null && result != null) {
        var wordValue = word.value;
        var wordResult = result.value == 'true' ? 1 : 0;

        await db.execAsync(`INSERT INTO words VALUES ("${wordValue}", ${wordResult})`)
    }
}

async function updateConfigAsync() {
    var timeElement = document.getElementById('time') as HTMLInputElement;
    var wordsNumberElement = document.getElementById('wordsNumber') as HTMLInputElement;

    if (timeElement != null && wordsNumberElement) {
        try {
            var time = Number.parseInt(timeElement.value);
            var wordsNumber = Number.parseInt(wordsNumberElement.value);

            var words = await db.selectAllAsync<Test[]>('SELECT * FROM words');
            if (words.length < wordsNumber)
                alert('Dado que el número de palabras es mayor que las palabras registradas, el test se generará con todas las palabras hasta que se añadan más');


            await db.execAsync(`Update configuration SET words_number = ${wordsNumber}, time = ${time} WHERE words_number is not null`);
        }
        catch (err) {
            console.error(err);
        }
    }
}