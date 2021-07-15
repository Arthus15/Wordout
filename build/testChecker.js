"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestChecker = void 0;
var TestChecker = /** @class */ (function () {
    function TestChecker(testWords) {
        this.testWords = [];
        this.testWords = testWords;
    }
    TestChecker.prototype.onSubmit = function () {
        var _this = this;
        var stopTimerEvent = new Event('stopTimer');
        document.dispatchEvent(stopTimerEvent);
        var mark = 0;
        this.testWords.forEach(function (x) {
            var goodAnswer = false;
            var elements = document.getElementsByName(x.word);
            var correct = elements[0];
            var incorrect = elements[1];
            if (x.result)
                goodAnswer = correct.checked;
            else
                goodAnswer = incorrect.checked;
            _this.disableRadioButtonsOnCorrection(correct, incorrect);
            if (correct.checked || incorrect.checked)
                mark = goodAnswer ? mark + 1 : mark - 1;
            var box = document.getElementById(x.word + "-id");
            if (box != null)
                box.style.setProperty('background-color', goodAnswer ? '#1a6607' : '#872323', 'important');
            var descriptionBox = document.getElementById(x.word + "-description");
            if (descriptionBox) {
                descriptionBox.style.removeProperty('display');
            }
            var element = document.getElementById('mark');
            if (element) {
                element.innerText = "Nota: " + mark / _this.testWords.length;
                element.style.removeProperty('display');
            }
        });
        var retryButtom = document.getElementById("retryTest");
        retryButtom.style.removeProperty('display');
    };
    TestChecker.prototype.disableRadioButtonsOnCorrection = function (correct, incorrect) {
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
    };
    return TestChecker;
}());
exports.TestChecker = TestChecker;
