import { WordoutDb } from './database';
import { Test } from "./models";

export class TestBuilder {
    private db: WordoutDb = new WordoutDb();

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
        '        </div>';


    private testHTml: string =
        '       <h2 class="timer">00:08:00</h2>' +
        '       <form name="testForm"  class="test-content-column">' +
        '           {questions}' +
        '       </form>' +
        '       <button onClick="testChecker.onSubmit();" class="button primary-button fixed-button">Finalizar Test</button>';

    public async buildTestAsync(): Promise<[string, Test[]]> {
        var words = await this.db.selectAllAsync<Test[]>('SELECT * FROM words');
        var result: string[] = [];
        words.forEach((x) => {
            result.push(this.buildQuestion(x.word));
        });

        return [this.testHTml.replace('{questions}', result.join(' ')), words];
    }

    private buildQuestion(word: string): string {
        var re = /{word}/gi;
        return this.questionHtml.replace(re, word);
    }
}