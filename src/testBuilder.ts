import { Test } from "./models";

export class TestBuilder {
    private questionHtml: string =
        '       <div class="box test-box">' +
        '            <h2>{word}</h2>' +
        '            <div class="control">' +
        '                <label class="radio">' +
        '                    <input type="radio" name="{word}">' +
        '                    Correcta' +
        '                </label>' +
        '                <label class="radio">' +
        '                    <input type="radio" name="{word}" value="">' +
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

    public buildTest(): [string, Test[]] {
        //loadwords TODO
        var mockTest: Test[] = [{ word: 'Prueba1', result: false }, { word: 'Prueba2', result: true }];
        var result: string[] = [];
        mockTest.forEach((x) => {
            result.push(this.buildQuestion(x.word));
        });

        return [this.testHTml.replace('{questions}', result.join(' ')), mockTest];
    }

    private buildQuestion(word: string): string {
        var re = /{word}/gi;
        return this.questionHtml.replace(re, word);
    }
}