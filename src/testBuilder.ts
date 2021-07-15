import { WordoutDb } from './database';
import { Test, Config } from "./models";
import { Timer } from './timer';

export class TestBuilder {
    private db: WordoutDb = new WordoutDb();
    private timer: Timer = new Timer();
    private currentTest: string = "";
    private currentResults: Test[] = [];

    private questionHtml: string =
        '       <div id="{word}-id" class="box test-box">' +
        '            <h2>{word}</h2>' +
        '            <div class="control">' +
        '                <label class="radio">' +
        '                    <input type="radio" name="{word}" value="true">' +
        '                    Correcta' +
        '                </label>' +
        '                <label class="radio">' +
        '                    <input type="radio" name="{word}" value="false">' +
        '                    Incorrecta' +
        '                </label>' +
        '            </div>' +
        '            <div id="{word}-description" style="display: none; background-color: #7289da; margin-top: 5px; border-radius: 10px;">' +
        '            <p style="padding: 10px;">{description}</p>' +
        '            </div>' +
        '        </div>';


    private testHTml: string =
        '       <h2 class="timer" id="timer">00:08:00</h2>' +
        '       <h2 class="mark" id="mark" style="display:none;"></h2>' +
        '       <form name="testForm" class="test-content-column">' +
        '           {questions}' +
        '       </form>' +
        '       <button onClick="testChecker.onSubmit();" class="button primary-button fixed-button-right">Finalizar Test</button>' +
        '       <button id="retryTest" onClick="loadTestAsync(true);" style="display: none;" class="button primary-button fixed-button-left">Repetir Test</button>';

    public async buildTestAsync(): Promise<[string, Test[]] | undefined> {
        var words = await this.db.selectAllAsync<Test[]>('SELECT * FROM words');
        var config = await this.db.selectAsync<Config>('Select * FROM configuration');
        if (config == null || config == undefined)
            throw new Error('Null configuration');

        var wordsNumber = config.words_number > words.length ? words.length : config.words_number;

        var result: string[] = [];
        var test: Test[] = [];

        for (var i = 0; i < wordsNumber; i++) {
            var rnd = Math.floor(Math.random() * ((words.length - 1)));

            result.push(this.buildQuestion(words[rnd]));
            test.push(words[rnd]);

            words.splice(rnd, 1);
        }

        this.currentTest = this.testHTml.replace('{questions}', result.join(' '));
        this.currentResults = test;

        return [this.currentTest, this.currentResults];
    }

    public retryTest(): [string, Test[]] | undefined {
        return [this.currentTest, this.currentResults];
    }

    public async startTimerAsync() {
        var config = await this.db.selectAsync<Config>('Select * FROM configuration');
        if (config == undefined)
            throw new Error('Null configuration');

        this.timer = new Timer(config.time, 'timer');

        this.timer.startAsync();
    }

    public async stopTimerAsync() {
        await this.stopTimerAsync();
    }

    private buildQuestion(word: Test): string {
        var html = this.questionHtml;

        html = html.replace('{description}', word.description)

        var re = /{word}/gi;
        return html.replace(re, word.word);
    }
}