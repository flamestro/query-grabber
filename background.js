let pathParameter = '';

const contextMenuItem = {
    "id": "pathParamGrabber",
    "title": "Grab Parameter",
    "contexts": ["selection", "link"],
}

// https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
function getQueryParams(url) {
    url = url.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(url)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

//https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
function copyToClipboard(textToClip) {
    let copyFrom = document.createElement("textarea");
    copyFrom.textContent = textToClip;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.blur();
    document.body.removeChild(copyFrom);
}

const clickHandler = (event) => {
    if (event.menuItemId === contextMenuItem.id && event.linkUrl) {
        chrome.storage.sync.get("pathParameter", ({pathParameter}) => {
            console.log(`${pathParameter} = ${getQueryParams(event.linkUrl)[pathParameter]}`)
            copyToClipboard(getQueryParams(event.linkUrl)[pathParameter])
        });
    }
}

chrome.runtime.onInstalled.addListener(() => {
    console.log("init")
    chrome.storage.sync.set({pathParameter});

    chrome.contextMenus.create(contextMenuItem);

    chrome.contextMenus.onClicked.addListener(clickHandler);
    console.log("done")
});