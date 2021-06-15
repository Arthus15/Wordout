import { TestBuilder } from './testBuilder';

//Primite function to load html inside the main page
function loadModule(pageUrl: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pageUrl, true);
    xhr.onreadystatechange = () => {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            var content = document.getElementById("divContent");
            if (content != null)
                content.innerHTML = xhr.responseText;
        } else {
            console.error('Something went wrong', xhr);
        }
    };

    xhr.send();
}

//Loads the test on memory and initialize the page
function loadTest() {
    var testBuilder = new TestBuilder();
    var html = testBuilder.buildTest();

    var content = document.getElementById("divContent");
    console.log('content: ', content);
    if (content != null)
        content.innerHTML = html;
}
