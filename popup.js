let queryParameterInput = document.getElementById("queryParam");

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