const GEMINI_API_KEY = "API_KEY_HERE";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

let prefix = "This is a webpage content. Summarize the following webpage in korean. Tell me what this page is and what I can do with it.\n"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize_page") {
        let prompt = prefix+ request.text[0].result
        fetch(GEMINI_API_URL, {
            method: "POST",
            body: JSON.stringify({
                contents: [{
                    parts:[{
                        text: prompt
                    }]
                }]
            }),
        })
        .then(response => response.json())
        .then(data => {
            sendResponse({summary: data["candidates"][0]["content"]["parts"][0]["text"]});
        })
        .catch(error => {
            sendResponse({summary: "Error summarizing text."});
        });
        return true; // Keep the message channel open for the asynchronous response
    }
});

