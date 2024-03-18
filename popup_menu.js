let btnGemini = document.getElementById("btn_gemini");
let inputText = document.getElementById("input_text");
let resultText = document.getElementById("result_text");

btnGemini.addEventListener("click", () => {
    resultText.innerText = "Summarizing...";
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: () => document.body.innerText,
        }, (injectionResults) => {
            if (chrome.runtime.lastError) {
                resultText.innerText = 'Script injection failed: '+ JSON.stringify(chrome.runtime.lastError);
                return;
            }

            chrome.runtime.sendMessage({action: "summarize_page", text: injectionResults}, response => {
                resultText.innerText = response.summary;
            });
        });
    });
});