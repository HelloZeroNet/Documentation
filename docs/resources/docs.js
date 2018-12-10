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

function applyZeroNetPatches() {
    console.log("applyZeroNetPatches")

    // Fix hashtag links
    let base_href = document.location.href.replace("index.html", "").replace(/[&?]wrapper_nonce=[A-Za-z0-9]+/, "")
    let base_tag = $("<base target='_top'/>")
    base_tag.attr("href", base_href)
    $(document.head).append(base_tag)

    // Fix apply hashtag scroll positions
    var page = new ZeroFrame()
    page.cmd("innerLoaded")

    // Fix cookie error
    document.__defineGetter__("cookie", function() { return "" })

    // Fix search button in small screens
    $(".md-header").css("padding-right", "70px")

    // Fix ajax
    page.monkeyPatchAjax()
}

inside_zeronet_wrapper = document.location.toString().indexOf("wrapper_nonce") != -1
if (inside_zeronet_wrapper) applyZeroNetPatches()
