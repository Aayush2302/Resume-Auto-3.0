// chrome.runtime.sendMessage({ action: "getResumeData" }, (resumeData) => {
//   if (resumeData) {
//     function fillInput(value, selector) {
//       if (value) {
//         const element = ducument.querySelector(selector);
//         if (element) {
//           element.value = value;
//           element.dispatchEvent(new Event("input", { bubbles: true }));
//         }
//       }
//     }

//     // fillInput(resumeData.profile_path, "");
//     fillInput(
//       resumeData.name,
//       "/html/body/div/div/div/div/div[2]/div[3]/input"
//     );
//     fillInput(
//       resumeData.email,
//       "/html/body/div/div/div/div/div[2]/div[4]/input"
//     );
//     fillInput(
//       resumeData.mobile,
//       "/html/body/div/div/div/div/div[2]/div[5]/input"
//     );
//     fillInput(
//       resumeData.linkedin_name,
//       "/html/body/div/div/div/div/div[2]/div[6]/input"
//     );
//     fillInput(
//       resumeData.linkedin_link,
//       "/html/body/div/div/div/div/div[2]/div[7]/input"
//     );
//     fillInput(
//       resumeData.github_name,
//       "/html/body/div/div/div/div/div[2]/div[8]/input"
//     );
//     fillInput(
//       resumeData.github_link,
//       "/html/body/div/div/div/div/div[2]/div[9]/input"
//     );
//     fillInput(
//       resumeData.about,
//       "/html/body/div/div/div/div/div[2]/div[10]/textarea"
//     );
//   }
// });

// 2nd try

// content.js

// Listen for messages from the extension
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.action === "fill_resume_data") {
//     fillResumeData(message.data);
//   }
// });

// function fillResumeData(data) {
//   document.querySelector('div.def-field input[placeholder="Name"]').value =
//     data.name;
//   document.querySelector('div.def-field input[placeholder="Email"]').value =
//     data.email;
//   document.querySelector('div.def-field input[placeholder="Phone no"]').value =
//     data.mobile;
//   // document.querySelector('div.def-field input[placeholder="Profile Path"]').value = data.profile_path;
//   // Add other fields accordingly
// }

// 3rd try
// Listen for messages from the extension
console.log("content is working");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "fill_resume_data") {
    fillResumeData(message.data);
  }
});

function fillResumeData(data) {
  // Utility function to set value and trigger events
  function setValueAndTriggerEvents(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      element.dispatchEvent(new Event("blur", { bubbles: true }));
    }
  }

  // Example selectors based on your provided placeholders
  setValueAndTriggerEvents('input[placeholder="Name"]', data.name);
  setValueAndTriggerEvents('input[placeholder="Email"]', data.email);
  setValueAndTriggerEvents('input[placeholder="Phone no"]', data.mobile);
  // Add more fields as needed

  // Example for LinkedIn and GitHub fields
  setValueAndTriggerEvents(
    'input[placeholder="Linkedin Name"]',
    data.linkedinName
  );
  setValueAndTriggerEvents(
    'input[placeholder="Linkedin link"]',
    data.linkedinLink
  );
  setValueAndTriggerEvents('input[placeholder="GitHub Name"]', data.githubName);
  setValueAndTriggerEvents('input[placeholder="GitHub link"]', data.githubLink);

  // Example for About field
  setValueAndTriggerEvents('textarea[name="summary"].summary-use', data.about);
}
