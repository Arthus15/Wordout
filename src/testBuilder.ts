export class TestBuilder {
    private questionHtml: string =
        '       <div class="box">' +
        '            <h2>{word}</h2>' +
        '            <div class="control">' +
        '                <label class="radio">' +
        '                    <input type="radio" name="answer">' +
        '                    Correcta' +
        '                </label>' +
        '                <label class="radio">' +
        '                    <input type="radio" name="answer">' +
        '                    Incorrect' +
        '                </label>' +
        '            </div>' +
        '        </div>';


    private testHTml: string =
        '<div class="new-test-content-row">' +
        '   <div class="new-test-content-column">' +
        '       {questions}' +
        '   </div>' +
        '</div>';

    public buildTest(): string {
        var questions: string[] = ['Prueba1', 'Prueba2', 'Prueba3'];
        var result: string[] = [];
        questions.forEach((x) => {
            result.push(this.buildQuestion(x));
        });

        return this.testHTml.replace('{questions}', result.join(' '));
    }

    private buildQuestion(word: string): string {
        return this.questionHtml.replace('{word}', word);
    }
}