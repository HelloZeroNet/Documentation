const currentDocsURL = 'https://zeronet.io/docs'
const oldDocsURL = 'https://zeronet.readthedocs.io'

// Point user to new documentation URL if necessary
if (window.location.href.startsWith(oldDocsURL)) {
    showRedirectNotice()
}

// addRedirectNotice shows a message about the current docs being outdated
function showRedirectNotice() {
    const notice = `
    <div class="notice">
        <h4>Hello there!</h4>
        <p>
            You're currently reading <strong>outdated</strong> documentation.<br>
            View the new docs at <a href="#" onclick="redirect()">` + currentDocsURL + `</a>
        </p>
    </div>
    `
    document.body.innerHTML += notice
}

// redirect takes the user to the new documentation, and the same page
// if it exists, otherwise the homepage
function redirect() {
    let newDocsURL = currentDocsURL + window.location.pathname.slice('/en/latest'.length);
    if (pageExists(newDocsURL)) {
        window.location = newDocsURL;
    } else {
        window.location = currentDocsURL;
    }
}

// pageExists takes in a URL and checks if it returns a 404
function pageExists(newDocsURL) {
    var request = new XMLHttpRequest;
    request.open('GET', newDocsURL, true);
    request.send();
    return (request.status == 200)
}
