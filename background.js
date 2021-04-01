const contextMenuItem = {
    "id": "pathParamGrabber",
    "title": "Grab Parameter",
    "contexts": ["selection", "link"],
}

// https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
const getQueryParams = (url) => {
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
const copyToClipboard = (textToClip) => {
    let copyFrom = document.createElement("textarea");
    copyFrom.textContent = textToClip;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.blur();
    document.body.removeChild(copyFrom);
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const clearNotification = (notificationId) => {
    chrome.notifications.clear(
        notificationId,
        () => {}
    )
}

const notifyUserWithText = (text) => {
    let notificationId = uuidv4();
    chrome.notifications.create(
        notificationId,
        {
            type: "basic",
            iconUrl: "/assets/clipboard128.png",
            title: "Path Grabber",
            message: text
        },
        () => {
            setTimeout(() => {
                clearNotification(notificationId);
            }, 1500);
        }
    );
}

const clickHandler = (event) => {
    if (event.menuItemId === contextMenuItem.id && event.linkUrl) {
        chrome.storage.sync.get("pathParameter", ({pathParameter}) => {
            if (getQueryParams(event.linkUrl)[pathParameter]) {
                console.log(`${pathParameter} = ${getQueryParams(event.linkUrl)[pathParameter]}`)
                copyToClipboard(getQueryParams(event.linkUrl)[pathParameter])
                notifyUserWithText(`Copied ${pathParameter}`);
            } else {
                notifyUserWithText(`No ${pathParameter} in link`);
            }
        });
    }
}

const loadApp = () => {
    console.log("init")
    chrome.contextMenus.create(contextMenuItem);

    chrome.contextMenus.onClicked.addListener(clickHandler);
    console.log("done")
}

chrome.runtime.onInstalled.addListener(() => {
    loadApp();
});

chrome.runtime.onStartup.addListener(() => {
    loadApp();
});