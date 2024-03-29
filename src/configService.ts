import { WordoutDb } from './database';
import { Test, Config } from './models';

var db = new WordoutDb();

async function AddWordAsync() {
    var word = document.getElementById('word') as HTMLInputElement;
    var result = document.getElementById('wordResult') as HTMLSelectElement;
    var description = document.getElementById('description') as HTMLTextAreaElement;

    if (word != null && result != null) {
        var wordValue = word.value;
        var wordResult = result.value == 'true' ? 1 : 0;
        var wordDescription = description.value;

        if (wordValue == '') {
            showSnackBar('La palabra no puede estar vacia', 'is-error');
            return;
        }

        await db.execAsync(`INSERT INTO words VALUES ("${wordValue}", ${wordResult}, "${wordDescription}")`);
        showSnackBar('Palabra añadida', 'is-success');
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
                showSnackBar('Dado que el número de palabras es mayor que las palabras registradas, el test se generará con todas las palabras hasta que se añadan más', 'is-warning');


            await db.execAsync(`Update configuration SET words_number = ${wordsNumber}, time = ${time} WHERE words_number is not null`).catch(() => alert('Ha habido un error añadiendo la palabra'));
        }
        catch (err) {
            console.error(err);
        }
    }
}

async function loadConfigurationPageAsync() {
    console.log('Loading configuration');
    var timeElement = document.getElementById('time') as HTMLInputElement;
    var wordsNumberElement = document.getElementById('wordsNumber') as HTMLInputElement;
    var config = await db.selectAsync<Config>('Select * FROM configuration');

    if (timeElement && wordsNumberElement && config) {
        timeElement.value = config.time.toString();
        wordsNumberElement.value = config.words_number.toString();
    }
}

function showSnackBar(msg: string, type: string) {
    var x = document.getElementById("snackbar") as HTMLElement;
    x.className = "show " + type;
    x.innerText = msg;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}