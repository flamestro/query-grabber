let pathParameterInput = document.getElementById("pathParam");

pathParameterInput.addEventListener("keyup", () => {
    let pathParameter = pathParameterInput.value
    chrome.storage.sync.set({ pathParameter: pathParameter });
})

chrome.storage.sync.get("pathParameter", ({pathParameter}) => {
    pathParameterInput.placeholder = pathParameter ? `current: ${pathParameter}`  : "Enter Parameter";
});