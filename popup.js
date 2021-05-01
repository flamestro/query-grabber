let queryParameterInput = document.getElementById("queryParam");
let urlInput = document.getElementById("urlToOpen");

queryParameterInput.addEventListener("keyup", () => {
    let queryParameter = queryParameterInput.value
    chrome.storage.sync.set({ queryParameter: queryParameter });
})

queryParameterInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter")
    {
        window.close();
    }
})

chrome.storage.sync.get("queryParameter", ({queryParameter}) => {
    queryParameterInput.placeholder = queryParameter ? `current: ${queryParameter}`  : "Enter Parameter";
});

urlInput.addEventListener("keyup", () => {
    let url = urlInput.value
    chrome.storage.sync.set({ url: url });
})

urlInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter")
    {
        window.close();
    }
})

chrome.storage.sync.get("url", ({url}) => {
    urlInput.placeholder = url ? `current: ${url}`  : "Enter Parameter";
});