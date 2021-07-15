import { TestBuilder } from './testBuilder';
import { TestChecker } from './testChecker';
import { remote } from 'electron';

var testBuilder = new TestBuilder();
var testChecker: TestChecker;

function closeWindow() {
    console.log('Cerrando');
    let w = remote.getCurrentWindow();
    console.log(w);
    w.close();
}


//Primite function to load html inside the main page
function loadModule(pageUrl: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pageUrl, true);
    xhr.onreadystatechange = () => {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            var content = document.getElementById("divContent");
            if (content != null) {
                content.innerHTML = xhr.responseText;

                var codes = content.getElementsByTagName("script");
                for (var i = 0; i < codes.length; i++) {
                    eval(codes[i].text);
                }
            }
        } else {
            console.error('Something went wrong', xhr);
        }
    };

    xhr.send();
}


//Loads the test on memory and initialize the page
async function loadTestAsync(isRetry: boolean = false) {
    if (isRetry)
        var tuple = testBuilder.retryTest();
    else
        var tuple = await testBuilder.buildTestAsync();

    if (tuple == undefined)
        return;

    testChecker = new TestChecker(tuple[1]);
    var content = document.getElementById("divContent");
    if (content != null) {
        content.innerHTML = tuple[0];
        await testBuilder.startTimerAsync();
        document.addEventListener('timesUp', () => {
            testChecker.onSubmit();
        });
    }
}