const currentDocsURL = 'https://zeronet.io/docs'
const oldDocsURL = 'https://zeronet.readthedocs.io'
var isRedirectChecked = false

// Point user to new documentation URL if necessary
if (window.location.href.startsWith(oldDocsURL)) {
    showRedirectNotice()
}

// addRedirectNotice shows a message about the current docs being outdated
function showRedirectNotice() {
    const notice = `
    <div class="notice" onmouseover="checkPageExists()">
        <h4>Documentation moved!</h4>
        <p>
            You're currently reading <strong>outdated</strong> documentation.<br>
            View the new docs at <a href="https://zeronet.io/docs" id='link_redirect'>` + currentDocsURL + `</a>
        </p>
    </div>
    `
    document.querySelector(".wy-nav-content").insertAdjacentHTML("afterbegin", notice);
}

// modify the redirect link to more specific one if it's still exists in new docs
function checkPageExists() {
    if (isRedirectChecked) return false;
    isRedirectChecked = true
    let newDocsURL = currentDocsURL + window.location.pathname.slice('/en/latest'.length);
    var request = new XMLHttpRequest;
    request.open('GET', newDocsURL);
    request.send();
    request.onload = function() {
        if (request.status == 200) {
            document.querySelector("#link_redirect").href = newDocsURL;
        }
    }
}
