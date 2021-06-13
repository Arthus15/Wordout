function loadModule(pageUrl: string) {
    var xhr = new XMLHttpRequest();
    console.log('Load module function');
    xhr.open('GET', pageUrl, true);
    xhr.onreadystatechange = () => {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            var content = document.getElementById("divContent");
            if (content != null)
                content.innerHTML = xhr.responseText;
        } else {
            console.log('Something went wrong', xhr);
        }
    };

    xhr.send();
}