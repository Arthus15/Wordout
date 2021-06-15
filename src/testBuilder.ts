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
        '                    <input type="radio" name="{word}">' +
        '                    Incorrecta' +
        '                </label>' +
        '            </div>' +
        '        </div>';


    private testHTml: string =
        '   <div class="test-content-column">' +
        '       <h2 class="timer">00:08:00</h2>' +
        '       {questions}' +
        '   <button class="button primary-button">Finalizar Test</button>' +
        '   </div>';

    public buildTest(): string {
        var questions: string[] = ['Prueba1', 'Prueba2', 'Prueba3', 'Prueba4', 'Prueba5', 'Prueba6', 'Prueba7', 'Prueba8', 'Prueba9',];
        var result: string[] = [];
        questions.forEach((x) => {
            result.push(this.buildQuestion(x));
        });

        return this.testHTml.replace('{questions}', result.join(' '));
    }

    private buildQuestion(word: string): string {
        var re = /{word}/gi;
        return this.questionHtml.replace(re, word);
    }
}