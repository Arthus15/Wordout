import { Test } from "./models";

export class TestChecker {
    testWords: Test[] = [];

    constructor(testWords: Test[]) {
        this.testWords = testWords;
    }

    onSubmit() {
        console.log('testWords: ', this.testWords);
        console.log('Doc form: ', document.forms);


    }
}