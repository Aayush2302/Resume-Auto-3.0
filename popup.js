document.addEventListener("DOMContentLoaded", function () {
  // Populate the form with saved data if available
  chrome.storage.local.get(["resumeData"], function (result) {
    if (result.resumeData) {
      document.getElementById("name").value = result.resumeData.name || "";
      document.getElementById("email").value = result.resumeData.email || "";
      document.getElementById("mobile").value = result.resumeData.mobile || "";
      document.getElementById("linkedinName").value =
        result.resumeData.linkedinName || "";
      document.getElementById("linkedinLink").value =
        result.resumeData.linkedinLink || "";
      document.getElementById("githubName").value =
        result.resumeData.githubName || "";
      document.getElementById("githubLink").value =
        result.resumeData.githubLink || "";
      document.getElementById("about").value = result.resumeData.about || "";
      document.getElementById("skills").value = result.resumeData.skills || "";
      document.getElementById("interests").value =
        result.resumeData.interests || "";
      document.getElementById("projects").value =
        result.resumeData.projects || "";
      document.getElementById("educations").value =
        result.resumeData.educations || "";
    }
  });

  // Handle form submission
  document
    .getElementById("resumeForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      var resumeData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        linkedinName: document.getElementById("linkedinName").value,
        linkedinLink: document.getElementById("linkedinLink").value,
        githubName: document.getElementById("githubName").value,
        githubLink: document.getElementById("githubLink").value,
        about: document.getElementById("about").value,
        skills: document.getElementById("skills").value,
        interests: document.getElementById("interests").value,
        projects: document.getElementById("projects").value,
        educations: document.getElementById("educations").value,
      };

      // Save the data in local storage
      chrome.storage.local.set({ resumeData: resumeData }, function () {
        console.log("Resume data is saved.");

        // Send the data to the content script with target identifier
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "fill_resume_data",
              data: resumeData,
              target: "contentScript",
            });
          }
        );
      });
    });

  // Handle "Fill with Stored Data" button click
  document
    .getElementById("fillStoredData")
    .addEventListener("click", function () {
      chrome.storage.local.get(["resumeData"], function (result) {
        if (result.resumeData) {
          // Send the data to the content script to fill the form
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: "fill_resume_data",
                data: result.resumeData,
                target: "contentScript",
              });
            }
          );
        } else {
          console.log("No stored resume data found.");
        }
      });
    });
});
