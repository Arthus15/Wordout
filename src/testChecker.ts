import { Test } from "./models";

export class TestChecker {
    testWords: Test[] = [];

    constructor(testWords: Test[]) {
        this.testWords = testWords;
    }

    onSubmit() {
        var stopTimerEvent = new Event('stopTimer');
        document.dispatchEvent(stopTimerEvent);

        var mark: number = 0;
        this.testWords.forEach((x) => {
            var goodAnswer = false;
            var elements = document.getElementsByName(x.word);

            var correct = elements[0] as HTMLInputElement;
            var incorrect = elements[1] as HTMLInputElement;

            if (x.result)
                goodAnswer = correct.checked;
            else
                goodAnswer = incorrect.checked;

            this.disableRadioButtonsOnCorrection(correct, incorrect);

            if (correct.checked || incorrect.checked)
                mark = goodAnswer ? mark + 1 : mark - 1;

            var box = document.getElementById(`${x.word}-id`);
            if (box != null)
                box.style.setProperty('background-color', goodAnswer ? '#1a6607' : '#872323', 'important');

            var descriptionBox = document.getElementById(`${x.word}-description`) as HTMLDivElement;

            if (descriptionBox) {
                descriptionBox.style.removeProperty('display');
            }

            var element = document.getElementById('mark');

            if (element) {
                element.innerText = `Nota: ${mark / this.testWords.length}`;
                element.style.removeProperty('display');
            }
        });
    }

    private disableRadioButtonsOnCorrection(correct: HTMLInputElement, incorrect: HTMLInputElement) {
        if (!correct.checked && !incorrect.checked) {
            correct.disabled = true;
            incorrect.disabled = true;
        }
        else if (correct.checked) {
            incorrect.disabled = true;
        }
        else {
            correct.disabled = true;
        }
    }
}