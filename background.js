chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ resumeData: {} });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getResumeData") {
    chrome.storage.sync.get("resumeData", (data) => {
      sendResponse(data.resumeData);
    });
    return true; // Required for async sendResponse
  }
});
